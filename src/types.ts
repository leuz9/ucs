export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Prayer {
  id: string;
  name: string;
  email: string;
  request: string;
  createdAt: string;
}

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}