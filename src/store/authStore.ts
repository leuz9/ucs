import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserRole } from '../types/roles';

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  
  login: async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data();
      const user = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role as UserRole
      };

      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      console.error('Login error:', error);
      set({ user: null, isAuthenticated: false, loading: false });
      throw error;
    }
  },

  register: async (data) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'member' as UserRole,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      const user = {
        uid: firebaseUser.uid,
        ...userData
      };

      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      console.error('Registration error:', error);
      set({ user: null, isAuthenticated: false, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  setUser: (user) => {
    set({ 
      user, 
      isAuthenticated: !!user,
      loading: false 
    });
  }
}));

// Observer pour les changements d'authentification
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        useAuthStore.getState().setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role as UserRole
        });
      } else {
        useAuthStore.getState().setUser(null);
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      useAuthStore.getState().setUser(null);
    }
  } else {
    useAuthStore.getState().setUser(null);
  }
});

export default useAuthStore;