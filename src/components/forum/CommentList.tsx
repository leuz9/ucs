import React from 'react';
import { Comment } from '../../types/forum';

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg">
          <p className="text-gray-600 mb-2">{comment.content}</p>
          <div className="text-sm text-gray-500">
            <span>{comment.authorName}</span>
            <span className="mx-2">•</span>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;