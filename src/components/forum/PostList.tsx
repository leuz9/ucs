import React from 'react';
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import { ForumPost } from '../../types/forum';

interface PostListProps {
  posts: ForumPost[];
  onSubmitComment: (postId: string, data: any) => Promise<void>;
}

function PostList({ posts, onSubmitComment }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PostCard post={post} onSubmitComment={onSubmitComment} />
        </motion.div>
      ))}
    </div>
  );
}

export default PostList;