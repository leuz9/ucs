import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, Tag, Users, ThumbsUp, Filter } from 'lucide-react';
import { collection, query, orderBy, getDocs, where, addDoc, updateDoc, doc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useAuthStore from '../../store/authStore';
import { ForumPost, Comment } from '../../types/forum';

const categories = [
  { id: 'general', name: 'Général', color: 'blue' },
  { id: 'prayer', name: 'Prière', color: 'purple' },
  { id: 'events', name: 'Événements', color: 'green' },
  { id: 'questions', name: 'Questions', color: 'orange' },
  { id: 'testimonies', name: 'Témoignages', color: 'red' }
];

function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, sortBy]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, 'forum_posts'));

      if (selectedCategory) {
        q = query(q, where('category', '==', selectedCategory));
      }

      if (sortBy === 'recent') {
        q = query(q, orderBy('createdAt', 'desc'));
      } else {
        q = query(q, orderBy('likesCount', 'desc'));
      }

      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ForumPost[];

      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: any) => {
    if (!user) return;

    try {
      const newPost = {
        title: data.title,
        content: data.content,
        category: data.category,
        authorId: user.uid,
        authorName: `${user.firstName} ${user.lastName}`,
        comments: [],
        likes: [],
        likesCount: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, 'forum_posts'), newPost);
      setShowNewPostForm(false);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) return;

    try {
      const postRef = doc(db, 'forum_posts', postId);
      const post = posts.find(p => p.id === postId);
      
      if (!post) return;

      const isLiked = post.likes.includes(user.uid);
      const newLikes = isLiked
        ? post.likes.filter(id => id !== user.uid)
        : [...post.likes, user.uid];

      await updateDoc(postRef, {
        likes: newLikes,
        likesCount: newLikes.length
      });

      loadPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const postRef = doc(db, 'forum_posts', postId);
      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        content,
        authorId: user.uid,
        authorName: `${user.firstName} ${user.lastName}`,
        createdAt: Timestamp.now()
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });

      loadPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-900 text-white">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <MessageCircle className="h-16 w-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Forum de Discussion
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Échangez, partagez et grandissez ensemble dans la foi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowNewPostForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouveau sujet
              </button>
              <div className="relative flex-grow md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Plus récents</option>
                <option value="popular">Plus populaires</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Aucun sujet trouvé
              </h3>
              <p className="text-gray-600">
                Soyez le premier à créer un sujet de discussion
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {post.authorName}
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            {categories.find(c => c.id === post.category)?.name}
                          </div>
                          <span>
                            {new Date(post.createdAt.toDate()).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                          post.likes.includes(user?.uid || '')
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        } hover:bg-blue-100 hover:text-blue-600 transition-colors`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {post.likesCount}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6">{post.content}</p>
                    
                    {/* Comments */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Commentaires ({post.comments.length})
                      </h4>
                      <div className="space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">
                                {comment.authorName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt.toDate()).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                          </div>
                        ))}
                        {user && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const form = e.target as HTMLFormElement;
                              const content = new FormData(form).get('comment') as string;
                              if (content.trim()) {
                                handleAddComment(post.id, content);
                                form.reset();
                              }
                            }}
                            className="flex gap-2"
                          >
                            <input
                              type="text"
                              name="comment"
                              placeholder="Ajouter un commentaire..."
                              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Commenter
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full mx-4 overflow-hidden"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  handleCreatePost(Object.fromEntries(formData));
                }}
                className="p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Nouveau sujet
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie
                    </label>
                    <select
                      name="category"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenu
                    </label>
                    <textarea
                      name="content"
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Publier
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Forum;