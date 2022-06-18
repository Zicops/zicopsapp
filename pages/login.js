import { useEffect, useState } from 'react';
import LoginComp from '../components/LoginComp/index';
import SignToLearningSpace from '../components/SignToLearningSpace';
import ChangePasswordScreen from '../components/ZicopsLogin/ChangePasswordScreen';
import LoginScreen from '../components/ZicopsLogin/LoginScreen';


const Login = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <ChangePasswordScreen setPage={setPage} />}
      {page === 1 && <SignToLearningSpace setPage={setPage} />}
      {page == 2 && <LoginScreen setPage={setPage} />}
    </>
  );
};

export default Login;
