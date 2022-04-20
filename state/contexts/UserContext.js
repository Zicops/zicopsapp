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

  const [bookmarkData, setBookmarkData] = useState([]);
  const addBookmarkData = (data) => {
    setBookmarkData([
      ...bookmarkData,
      {
        id: data.id,
        timestamp: data.timestamp,
        title: data.title,
        captureImg: data.captureImg
      }
    ]);
  };

  const [notes, setNotes] = useState([]);
  const addNotes = (data) => {
    setNotes([
      ...notes,
      {
        id: data.id,
        timestamp: data.timestamp,
        title: data.title,
        notes: data.notes
      }
    ]);
  };

  return (
    <userContext.Provider value={{ isAdmin, makeAdmin, bookmarkData, addBookmarkData, notes, addNotes }}>{props.children}</userContext.Provider>
  );
};

export default UserContextProvider;
