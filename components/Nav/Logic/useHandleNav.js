import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

export function useHandleNav(isAdmin, setAdmin) {
  const userData = useRecoilValue(UserStateAtom);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isOnLearnerSide, setIsOnLearnerSide] = useState(true);
  const router = useRouter();
  const searchInputRef = useRef(null);

  const pathArr = router.asPath.split('/');
  const searchText = pathArr?.[2] || null;

  useEffect(() => {
    setSearchQuery(searchText?.replace(/%20/gi, ' '));

    if (searchText) searchInputRef.current?.focus();
  }, [searchText]);

  useEffect(() => {
    // const route = router.asPath;
    // window.localStorage.setItem('isAdmin', route.includes('admin') ? 1 : 0);

    // setAdmin(JSON.parse(window.localStorage.getItem('isAdmin')));
    const role = sessionStorage?.getItem('user_lsp_role');
    if (!role) return;
    console.log(role, 'role');
    setAdmin(role.toLowerCase() === 'admin');
  }, [userData?.id]);

  useEffect(() => {
    setIsOnLearnerSide(!router?.pathname?.includes('/admin'));
  }, [isAdmin, router?.pathname]);

  // whenever input is render it should be on focus
  // useEffect(() => {
  //   searchInputRef.current?.focus();
  // }, [searchInputRef.current]);

  function gotoAdmin() {
    // setAdmin(1);
    router.push('/admin');
  }

  function gotoUser() {
    // setAdmin(0);
    router.push('/');
  }

  function activateSearch() {
    // setSearchQuery('');
    searchInputRef.current?.focus();
  }

  function deactivateSearch(e) {
    if (searchQuery?.length > 0) return;
    if (e.relatedTarget?.className.includes('nav')) return;

    // setSearchQuery(null);
  }

  function handleSearch(e) {
    e.stopPropagation();
    const searchText = e.target.value;
    console.log(searchText);
    setSearchQuery(searchText);
  }

  return {
    isOnLearnerSide,
    searchQuery,
    searchInputRef,
    activateSearch,
    deactivateSearch,
    handleSearch,
    gotoAdmin,
    gotoUser
  };
}
