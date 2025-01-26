import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserRole } from '../types/roles';

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export const register = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    // Stocker les informations supplémentaires dans Firestore avec le rôle "member"
    await setDoc(doc(db, 'users', user.uid), {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'member' as UserRole,
      createdAt: new Date().toISOString()
    });

    return {
      user: {
        uid: user.uid,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'member' as UserRole
      }
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    const userData = userDoc.data() as UserData;
    return {
      user: {
        uid: user.uid,
        ...userData
      }
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getCurrentUser = async (user: FirebaseUser) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return null;
    }
    return {
      uid: user.uid,
      ...userDoc.data()
    };
  } catch (error: any) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw error;
  }
};