import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export function useHandleNav(isAdmin, setAdmin) {
  const [searchQuery, setSearchQuery] = useState(null);
  const router = useRouter();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const route = router.asPath;
    window.localStorage.setItem('isAdmin', route.includes('admin') ? 1 : 0);

    setAdmin(JSON.parse(window.localStorage.getItem('isAdmin')));
  }, []);

  // whenever input is render it should be on focus
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [searchInputRef.current]);

  function gotoAdmin() {
    setAdmin(1);
    router.push('/admin');
  }

  function gotoUser() {
    setAdmin(0);
    router.push('/');
  }

  function activateSearch() {
    setSearchQuery('');
    searchInputRef.current?.focus();
  }

  function deactivateSearch(e) {
    if (searchQuery?.length > 0) return;
    if (e.relatedTarget?.className.includes('nav')) return;

    setSearchQuery(null);
  }

  function handleSearch(e) {
    e.stopPropagation();
    const searchText = e.target.value;
    console.log(searchText);
    setSearchQuery(searchText);
  }

  return {
    searchQuery,
    searchInputRef,
    activateSearch,
    deactivateSearch,
    handleSearch,
    gotoAdmin,
    gotoUser
  };
}
