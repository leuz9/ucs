import { Timestamp } from 'firebase/firestore';

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  comments: Comment[];
  likes: string[];
  likesCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}