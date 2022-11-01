import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginComp from '@/components/LoginComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { parseJson } from '@/helper/utils.helper';

const SignUp = () => {
  const ACCESS_PATH = ['/account-setup']
  const userData = useRecoilValue(UserStateAtom);
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  // to check if we have use logged in or not
  useEffect(() => {
    // console.log(userData,'sfss');
    // if (userData?.is_verified) return router.back();
    // return;

        // on initial load - run auth check
        accessCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', accessCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeStart', hideContent);
          router.events.off('routeChangeComplete', accessCheck);
        };
  }, []);

  function accessCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];

    //in case if users recoil value gets lost
    if(!userData?.id?.length){
      const _userSessionData = parseJson(sessionStorage.getItem('loggedUser'));
      if(!_userSessionData) return router.push('/login');
      if(_userSessionData?.is_verified) return router.push('/');
    }
    // console.log(path);

    // const userData = parseJson(sessionStorage.getItem('loggedUser'));
    // if (!userData?.is_verified && !PUBLIC_PATHS.includes(path) && !path?.includes('account-setup'))
    //   return router.push('/account-setup');

    // if (!!localStorage.getItem(GIBBERISH_VALUE_FOR_LOGIN_STATE) && userData) return setAuthorized(true);  

    if (userData?.is_verified && ACCESS_PATH.includes(path)) {
      //this is temporary will delete later
      setAuthorized(false);
      // if (path === '/') return router.push('/home');
      router.push('/');
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: '#6bcfcf'
            },
            mode: 'dark'
          }
        })}>
        {authorized && <LoginComp />}
      </ThemeProvider>
    </>
  );
};

export default SignUp;
