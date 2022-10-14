import { GIBBERISH_VALUE_FOR_LOGIN_STATE, PUBLIC_PATHS } from '@/helper/constants.helper';
import { parseJson } from '@/helper/utils.helper';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthChecker = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { logOut } = useAuthUserContext();

  // https://stackoverflow.com/questions/20325763/browser-sessionstorage-share-between-tabs
  useEffect(() => {
    // transfers sessionStorage from one tab to another
    var sessionStorage_transfer = function (event) {
      if (!localStorage.getItem(GIBBERISH_VALUE_FOR_LOGIN_STATE)) {
        if (!!PUBLIC_PATHS?.find((route) => router?.asPath?.includes(route))) return;
        if (isLoggedIn != null) {
          logOut();
          return setIsLoggedIn(null);
        }

        return setIsLoggedIn((prev) => {
          if (prev === 1) {
            logOut();
            return null;
          }

          return 1;
        });
      }

      if (!event) event = window.event;
      if (event?.key === GIBBERISH_VALUE_FOR_LOGIN_STATE) {
        localStorage.setItem('getSessionStorage', 'foobar');
        localStorage.removeItem('getSessionStorage', 'foobar');
      }

      if (!event.newValue) return;
      if (event.key == 'getSessionStorage') {
        // another tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        // the other tab should now have it, so we're done with it.
        setTimeout(() => {
          localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
        }, 500);
      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // another tab sent data <- get it
        var data = parseJson(event?.newValue);

        if (data) window.location.reload();
        // // custom event
        // const e = new Event('login');
        // // Dispatch the event.
        // window.dispatchEvent(e);

        // authCheck(router.asPath);
        for (var key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    };

    // listen for changes to localStorage
    if (window.addEventListener) {
      window.addEventListener('storage', sessionStorage_transfer, false);
    } else {
      window.attachEvent('onstorage', sessionStorage_transfer);
    }

    // Ask other tabs for session storage (this is ONLY to trigger event)
    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', 'foobar');
      localStorage.removeItem('getSessionStorage', 'foobar');
    }

    return () => window.removeEventListener('storage', sessionStorage_transfer, false);
  }, [router?.asPath]);

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
    if (!!localStorage.getItem(GIBBERISH_VALUE_FOR_LOGIN_STATE)) return setAuthorized(true);

    const userData = parseJson(sessionStorage.getItem('loggedUser'));

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
