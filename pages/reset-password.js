// import LoginComp from '@/components/LoginComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChangePasswordScreen from '@/components/ZicopsLogin/ChangePasswordScreen';

const SignUp = () => {
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
        <ChangePasswordScreen />
      </ThemeProvider>
    </>
  );
};

export default SignUp;
