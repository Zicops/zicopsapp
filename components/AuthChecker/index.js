import { PUBLIC_PATHS } from '@/helper/constants.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthChecker = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);

useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];
    // console.log(path);
    const userData = JSON.parse(sessionStorage.getItem('loggedUser'));
    if (!userData && !PUBLIC_PATHS.includes(path)) {
      //this is temporary will delete later
      setAuthorized(false);
      if (path === '/') return router.push('/home');
      router.push({
        pathname: '/login'
        // query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
};

export default AuthChecker;
