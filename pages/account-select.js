
import LoginComp from '@/components/LoginComp';
import UserAccountSelect from '@/components/UserAccountSelect';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
        <UserAccountSelect/>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
