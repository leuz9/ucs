import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Event } from '../types';

const COLLECTION = 'events';

export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(collection(db, COLLECTION), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...event,
    createdAt: new Date().toISOString()
  });
  return {
    id: docRef.id,
    ...event
  };
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  const eventRef = doc(db, COLLECTION, id);
  await updateDoc(eventRef, event);
  return {
    id,
    ...event
  } as Event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};