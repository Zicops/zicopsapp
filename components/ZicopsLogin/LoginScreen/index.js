import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { userState } from '@/state/atoms/users.atom';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { userClient, USER_LOGIN } from 'API/UserMutations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import styles from '../LoginEmail/loginEmail.module.scss';
import LoginHeadOne from '../LoginHeadOne';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import HomeHeader from '@/components/HomePage/HomeHeader';

const LoginScreen = ({ setPage }) => {
  const [userLogin, { error: loginError }] = useMutation(USER_LOGIN, {
    client: userClient
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const setUserData = useSetRecoilState(userState);

  // const [error, setError] = useState(null);

  const router = useRouter();

  const { signIn, authUser, loading, errorMsg, logOut } = useAuthUserContext();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    const checkEmail = isEmail(email);
    if (!checkEmail) return setToastMsg({ type: 'danger', message: 'Enter valid email!!' });

    await signIn(email, password);

    // if (errorMsg) return;
    console.log(authUser?.token);

    sessionStorage.setItem('tokenF', authUser?.token);

    let isError = false;
    const res = await userLogin().catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Login Error' });
    });

    console.log(res);
    return;
    // if (!res?.isVerified) return { router.push('/account-setup') };

    //return router.push('/');
    // setUserState({ ...res, tokenF: authUser?.token });
    // if (isError) return;
    console.log(auth?.currentUser);
    return;
  };

  useEffect(() => {
    if (errorMsg) return setToastMsg({ type: 'danger', message: errorMsg });
  }, [errorMsg, authUser]);

  //to check if our user is logged in or not
  useEffect(() => {
    if (!loading && !authUser) router.push('/login');
  }, [authUser, loading]);

  return (
    <>
      <HomeHeader showLogin={false} />

      <ZicopsLogin>
        <LoginHeadOne
          heading={'Sign Into Your Learning Space'}
          sub_heading={'Start your first step to learning here!'}
        />
        <div className="login_body">
          <input
            className={`${styles.login_email_input}`}
            type={'email'}
            placeholder={'Email address'}
            onChange={handleEmail}
            // onFocus={chngeHandle}
            // style={{ margin: '5px 0px' }}
          />
          <LoginEmail type={'password'} placeholder={'Password'} chngeHandle={handlePassword} />
          <div className={`${styles.small_text}`}>
            <span />
            <p>Forgot Password?</p>
          </div>

          <LoginButton title={'Login'} handleClick={handleSubmit} />
        </div>
      </ZicopsLogin>
      <style jsx>{`
        .login_body {
          width: 400px;
        }
        .small_text {
          font-size: 14px;
          color: #acacac;
          //   font-weight: bold;
          // padding: 15px 0px;
          text-align: right;
          text-decoration: underline;
        }
        .small_text:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default LoginScreen;
