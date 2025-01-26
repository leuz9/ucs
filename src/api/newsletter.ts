import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION = 'newsletter_subscribers';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: Date;
  status: 'active' | 'unsubscribed';
}

export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Code existant...
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { 
      success: false, 
      message: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' 
    };
  }
};

export const getNewsletterSubscribers = async (): Promise<NewsletterSubscriber[]> => {
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NewsletterSubscriber[];
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
};

export const updateSubscriberStatus = async (subscriberId: string, status: 'active' | 'unsubscribed'): Promise<boolean> => {
  try {
    const subscriberRef = doc(db, COLLECTION, subscriberId);
    await updateDoc(subscriberRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating subscriber status:', error);
    return false;
  }
};

export const deleteSubscriber = async (subscriberId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTION, subscriberId));
    return true;
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return false;
  }
};