import { createContext, useContext } from 'react';
import useFirebaseAuth from '@/helper/firebaseUtil/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  errorMsg: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuthUserContext = () => useContext(authUserContext);
