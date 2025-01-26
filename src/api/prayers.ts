import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Prayer } from '../types';

const COLLECTION = 'prayers';

export const submitPrayer = async (prayer: Omit<Prayer, 'id'>): Promise<Prayer> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...prayer,
      createdAt: new Date().toISOString()
    });
    return {
      id: docRef.id,
      ...prayer
    };
  } catch (error) {
    console.error('Error submitting prayer:', error);
    throw error;
  }
};

export const getPrayers = async (): Promise<Prayer[]> => {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Prayer[];
  } catch (error) {
    console.error('Error fetching prayers:', error);
    return [];
  }
};