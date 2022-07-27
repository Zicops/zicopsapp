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
  user: user,
  token: user.accessToken
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

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

  const signIn = async (email, password) => {
    console.log(email, password);
    await signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        auth.currentUser.getIdToken().then((token) => {
          console.log(token);
        });
      })
      .catch((error) => {
        const err = error.code.slice(5).split('-').join(' ');
        setErrorMsg(err);
      });
  };

  // const signUp = (email, password) => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then()
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const logOut = () => signOut(auth).then(clear);

  useEffect(() => {
    onAuthStateChanged(auth, authStateChanged);
  }, []);

  return {
    authUser,
    loading,
    errorMsg,
    signIn,
    logOut
  };
}
