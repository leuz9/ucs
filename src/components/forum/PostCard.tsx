import React from 'react';
import { useForm } from 'react-hook-form';
import { ForumPost } from '../../types/forum';
import CommentList from './CommentList';

interface PostCardProps {
  post: ForumPost;
  onSubmitComment: (postId: string, data: any) => Promise<void>;
}

function PostCard({ post, onSubmitComment }: PostCardProps) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {post.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{post.content}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>Par {post.authorName}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="border-t bg-gray-50 p-6">
        <h3 className="text-lg font-semibold mb-4">Commentaires</h3>
        <CommentList comments={post.comments} />
        
        <form
          onSubmit={handleSubmit((data) => onSubmitComment(post.id, data))}
          className="mt-4"
        >
          <div className="flex space-x-3">
            <input
              type="text"
              {...register(`comment-${post.id}`, { required: true })}
              placeholder="Ajouter un commentaire..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Commenter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostCard;