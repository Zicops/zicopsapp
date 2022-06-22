import { useEffect, useState } from 'react';
import LoginComp from '../components/LoginComp/index';
import SignToLearningSpace from '../components/SignToLearningSpace';
import ChangePasswordScreen from '../components/ZicopsLogin/ChangePasswordScreen';
import LoginScreen from '../components/ZicopsLogin/LoginScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Login = () => {
  const [page, setPage] = useState(3);

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
        {page === 0 && <ChangePasswordScreen setPage={setPage} />}
        {page === 1 && <SignToLearningSpace setPage={setPage} />}
        {page === 2 && <LoginScreen setPage={setPage} />}
        {page === 3 && <LoginComp />}
      </ThemeProvider>

    </>
  );
};

export default Login;
