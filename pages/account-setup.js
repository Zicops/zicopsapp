import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginComp from '@/components/LoginComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';

const SignUp = () => {
  const userData = useRecoilState(UserStateAtom);

  const router = useRouter();

  // to check if we have use logged in or not
  // useEffect(() => {
  //   if (userData) return router.push('/');
  // }, []);

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
