import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase';
import { AuthContext } from './AuthContextInstance';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(auth));

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, fullName) => {
    if (!auth) {
      throw new Error('Firebase credentials are not configured. Please check the .env file.');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (fullName && fullName.trim()) {
      await updateProfile(userCredential.user, {
        displayName: fullName.trim(),
      });
      await userCredential.user.reload();
      setCurrentUser(auth.currentUser);
    }
    return userCredential;
  };

  const login = async (email, password) => {
    if (!auth) {
      throw new Error('Firebase credentials are not configured. Please check the .env file.');
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase credentials are not configured. Please check the .env file.');
    }
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    if (!auth) {
      return;
    }
    return firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
