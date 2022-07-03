import { useRecoilValue } from 'recoil';
import { userState } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginComp from '@/components/LoginComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const SignUp = () => {
  const [isLogged, setIsLogged] = useState(0);
  const userData = useRecoilValue(userState);

  const router = useRouter();

  // to check if we have use logged in or not
  useEffect(() => {
    if (userData) {
      router.push('/');
      return;
    }
    router.push('/signup');
  }, [userState]);

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
        <LoginComp />
      </ThemeProvider>
    </>
  );
};

export default SignUp;
