import { useEffect, useState } from 'react';
import LoginComp from '../components/LoginComp/index';
import SignToLearningSpace from '../components/SignToLearningSpace';
import ChangePasswordScreen from '../components/ZicopsLogin/ChangePasswordScreen';
import LoginScreen from '../components/ZicopsLogin/LoginScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Login = () => {
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
        <LoginScreen />
      </ThemeProvider>
    </>
  );
};

export default Login;
