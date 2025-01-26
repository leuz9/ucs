import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION = 'newsletter_subscribers';

export const subscribeToNewsletter = async (email: string): Promise<{ message: string }> => {
  try {
    // Vérifier si l'email existe déjà
    const q = query(collection(db, COLLECTION), where('email', '==', email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { message: 'Cet email est déjà inscrit à la newsletter' };
    }

    // Ajouter le nouvel abonné
    await addDoc(collection(db, COLLECTION), {
      email,
      createdAt: new Date().toISOString()
    });

    return { message: 'Inscription à la newsletter réussie' };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};