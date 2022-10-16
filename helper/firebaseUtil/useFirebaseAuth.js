import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GIBBERISH_VALUE_FOR_LOGIN_STATE } from '../constants.helper';
import { auth } from './firebaseConfig';

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
    setErrorMsg(null);
    return await signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => authUser)
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

  const logOut = async () => {
    sessionStorage.clear();
    localStorage.removeItem(GIBBERISH_VALUE_FOR_LOGIN_STATE, GIBBERISH_VALUE_FOR_LOGIN_STATE);
    await signOut(auth).then(clear);

    router.push('/login');
  };

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
