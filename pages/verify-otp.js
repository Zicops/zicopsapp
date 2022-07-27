import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignToLearningSpace from '@/components/SignToLearningSpace';

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
        <SignToLearningSpace />
      </ThemeProvider>
    </>
  );
};

export default SignUp;
