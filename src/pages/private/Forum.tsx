import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useAuthStore from '../../store/authStore';
import PostList from '../../components/forum/PostList';
import NewPostForm from '../../components/forum/NewPostForm';
import CategoryFilter from '../../components/forum/CategoryFilter';
import { ForumPost } from '../../types/forum';

const categories = ['Général', 'Prière', 'Événements', 'Questions', 'Témoignages'];

function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    try {
      let q = query(collection(db, 'forum_posts'), orderBy('createdAt', 'desc'));
      
      if (selectedCategory) {
        q = query(q, where('category', '==', selectedCategory));
      }

      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ForumPost[];

      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const onSubmitPost = async (data: any) => {
    if (!user) return;

    try {
      const newPost = {
        title: data.title,
        content: data.content,
        category: data.category,
        authorId: user.uid,
        authorName: `${user.firstName} ${user.lastName}`,
        comments: [],
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'forum_posts'), newPost);
      setShowNewPostForm(false);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const onSubmitComment = async (postId: string, data: any) => {
    if (!user) return;

    try {
      const postRef = doc(db, 'forum_posts', postId);
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        content: data[`comment-${postId}`],
        authorId: user.uid,
        authorName: `${user.firstName} ${user.lastName}`,
        createdAt: new Date().toISOString()
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });

      loadPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau sujet
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {showNewPostForm && (
        <NewPostForm
          categories={categories}
          onSubmit={onSubmitPost}
          onCancel={() => setShowNewPostForm(false)}
        />
      )}

      <PostList posts={posts} onSubmitComment={onSubmitComment} />
    </div>
  );
}

export default Forum;