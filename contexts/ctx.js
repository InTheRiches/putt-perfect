// src/contexts/SessionProvider.js
import React, { useContext, createContext, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { useStorageState } from './StorageState';

const AuthContext = createContext({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  session: null,
  isLoading: false,
});

// Custom hook to access authentication context
export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session', null);
  const [loading, setLoading] = useState(true);

    const firebase = getAuth();

  // Firebase sign-in function
  const signIn = async (email, password) => {
    try {
      const userCredential = await firebase.signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      setSession(token || null);
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  };

  // Firebase sign-out function
  const signOut = async () => {
    try {
      await firebase.signOut();
      setSession(null);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  // Monitor Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setSession(token);
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}