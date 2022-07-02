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

  const signIn = (email, password) => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        // console.log(auth.currentUser);
      })
      .catch((error) => {
        setErrorMsg(error.code.slice(5).split('-').join(' '));
        console.log(JSON.stringify(error.code.slice(5).split('-').join(' ')));
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
