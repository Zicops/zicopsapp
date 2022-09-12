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
        user_bm_id: data?.user_bm_id,
        user_id: data?.user_id,
        user_lsp_id: data?.user_lsp_id,
        course_id: data?.course_id,
        user_course_id: data?.user_course_id,
        module_id: data?.module_id,
        topic_id: data?.topic_id,
        time_stamp: data?.time_stamp,
        name: data?.name,
        is_active: data?.is_active
        // captureImg: data?.captureImg
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
    <userContext.Provider
      value={{
        isAdmin,
        makeAdmin,
        bookmarkData,
        addBookmarkData,
        setBookmarkData, // TODO: remove later
        notes,
        addNotes
      }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
