import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useHandleNav(isAdmin, setAdmin) {
  const [isSearch, setSearch] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const route = router.route;
    window.localStorage.setItem('isAdmin', route.includes('admin') ? 1 : 0);

    setAdmin(JSON.parse(window.localStorage.getItem('isAdmin')));
  }, []);

  function gotoAdmin() {
    setAdmin(1);
    router.push('/admin');
  }
  function gotoUser() {
    setAdmin(0);
    router.push('/');
  }

  function handleMouseHover(searchStatus) {
    setSearch(searchStatus);
  }

  function handleSearch(e) {
    const searchText = e.target.value;
    console.log(searchText);
    setSearch(1)
  }

  return { isSearch, handleMouseHover, handleSearch, gotoAdmin, gotoUser };
}
