// import LoginComp from '@/components/LoginComp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ForgotPassword from '@/components/ZicopsLogin/ForgotPassword';

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
        <ForgotPassword />
      </ThemeProvider>
    </>
  );
};

export default SignUp;
