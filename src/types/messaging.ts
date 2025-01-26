export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  createdAt: string;
  read: boolean;
}

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}