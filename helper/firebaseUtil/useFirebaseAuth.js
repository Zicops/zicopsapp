import { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { useRouter } from 'next/router';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  token: user.accessToken
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        //console.log(auth.currentUser);
      })
      .catch((error) => {
        console.log(error.message);
      });

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth).then(clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, []);

  return {
    authUser,
    loading,
    signIn,
    signUp,
    logOut
  };
}
