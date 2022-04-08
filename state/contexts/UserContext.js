import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

export const userContext = createContext();

const UserContextProvider = (props) => {
  const [isAdmin, setAdmin] = useState(0);
  const [redirect, setRedirect] = useState('/admin');
  const makeAdmin = (data) => setAdmin(data);
  const router = useRouter();

  useEffect(() => {
    window.localStorage.setItem('isAdmin', isAdmin);
    // router.push(isAdmin? '/admin': '/')
  }, [isAdmin]);

  return (
    <userContext.Provider value={{ isAdmin, makeAdmin }}>{props.children}</userContext.Provider>
  );
};

export default UserContextProvider;
