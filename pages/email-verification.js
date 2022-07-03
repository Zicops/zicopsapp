import { useRecoilValue } from 'recoil';
import { userState } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignToLearningSpace from '@/components/SignToLearningSpace';

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
        <SignToLearningSpace />
      </ThemeProvider>
    </>
  );
};

export default SignUp;
