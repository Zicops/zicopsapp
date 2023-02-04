import { GIBBERISH_VALUE_FOR_LOGIN_STATE, PUBLIC_PATHS } from '@/helper/constants.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { parseJson } from '@/helper/utils.helper';
import { FeatureFlagsAtom, getUserGlobalDataObj, UserDataAtom } from '@/state/atoms/global.atom';
import { getUserObject, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const AuthChecker = ({ children }) => {
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const [userDataGlobal, setUserDataGlobal] = useRecoilState(UserDataAtom);
  const [userOrg, setUserOrg] = useRecoilState(UsersOrganizationAtom);

  const { getUserLspRoleLatest } = useUserCourseData();
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { logOut } = useAuthUserContext();

  function logUserOut() {
    setUserDataGlobal(getUserGlobalDataObj());
    setUserProfileData(getUserObject());

    logOut();
  }

  // https://stackoverflow.com/questions/20325763/browser-sessionstorage-share-between-tabs
  useEffect(() => {
    // transfers sessionStorage from one tab to another
    var sessionStorage_transfer = function (event) {
      if (!localStorage.getItem(GIBBERISH_VALUE_FOR_LOGIN_STATE)) {
        if (!!PUBLIC_PATHS?.find((route) => router?.asPath?.includes(route))) return;
        if (isLoggedIn != null) {
          logUserOut();
          return setIsLoggedIn(null);
        }

        return setIsLoggedIn((prev) => {
          if (prev === 1) {
            logUserOut();
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

  useEffect(() => {
    if (!router.asPath?.includes('admin')) return;
    if(!!userOrg?.user_lsp_role?.length) return ;
    const _userLspRole = sessionStorage?.getItem('user_lsp_role');
    if (!_userLspRole?.toLowerCase()?.includes('admin')) return router.push('/');
  }, [router?.asPath]);

  async function lspCheck() {
    if (userOrg?.lsp_id) return;

    const user = parseJson(sessionStorage?.getItem('loggedUser'));
    const _lspId = sessionStorage?.getItem('lsp_id');
    const _userLspId = sessionStorage?.getItem('user_lsp_id');
    const _orgId = sessionStorage?.getItem('org_id');
    let userLspRole = sessionStorage?.getItem('user_lsp_role') ?? '';
    userLspRole = await getUserLspRoleLatest(user?.id, _userLspId);

    sessionStorage?.setItem('user_lsp_role', userLspRole);

    if (!_lspId) return router.push('/learning-spaces');

    return setUserOrg((prevValue) => ({
      ...prevValue,
      lsp_id: _lspId,
      user_lsp_id: _userLspId,
      organization_id: _orgId,
      user_lsp_role: userLspRole
    }));
  }

  async function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];
    // console.log(path);

    const userData = parseJson(sessionStorage.getItem('loggedUser'));
    // if (!userData?.is_verified && !PUBLIC_PATHS.includes(path) && !path?.includes('account-setup'))
    //   return router.push('/account-setup');

    if (!!localStorage.getItem(GIBBERISH_VALUE_FOR_LOGIN_STATE) && userData) {
      if (['/learning-spaces'].includes(path)) return setAuthorized(true);
      await lspCheck();
      return setAuthorized(true);
    }

    if (!userData && !PUBLIC_PATHS.includes(path)) {
      //this is temporary will delete later
      setAuthorized(false);
      if (path === '/') return router.push('/home');
      router.push({
        pathname: '/login'
        // query: { returnUrl: router.asPath }
      });
      return;
    } else {
      // lspCheck();

      setAuthorized(true);
    }
  }

  return authorized && children;
};

export default AuthChecker;
