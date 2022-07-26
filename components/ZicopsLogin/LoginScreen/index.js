import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { userState } from '@/state/atoms/users.atom';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { userClient, USER_LOGIN } from 'API/UserMutations';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import styles from '../LoginEmail/loginEmail.module.scss';
import styless from '../zicopsLogin.module.scss';
import LoginHeadOne from '../LoginHeadOne';
import { useMutation } from '@apollo/client';

import HomeHeader from '@/components/HomePage/HomeHeader';

const LoginScreen = ({ setPage }) => {
  const [userLogin, { error: loginError }] = useMutation(USER_LOGIN, {
    client: userClient
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [vidIsOpen, setVidIsOpen] = useState(false);
  const vidRef = useRef();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const setUserData = useSetRecoilState(userState);

  const [screenSize, setScreentSize] = useState({ width: 0, height: 0 });

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

    if (errorMsg) return setToastMsg({ type: 'danger', message: errorMsg });

    sessionStorage.setItem('tokenF', authUser?.token);

    router.prefetch('/');
    setVidIsOpen(true);
    vidRef.current.play();

    let isError = false;
    const res = await userLogin().catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Login Error' });
    });

    console.log(res?.data?.login?.is_verified);

    return;
    // if (!res?.isVerified) return { router.push('/account-setup') };
    //setVidIsOpen(true);
    //vidRef.current.play();
    //router.prefetch('/');
    //return ;
    // setUserState({ ...res, tokenF: authUser?.token });
    // if (isError) return;
  };

  useEffect(() => {
    const sheight = window.screen.height;
    const swidth = window.screen.width;
    setScreentSize((prevValue) => ({ ...prevValue, height: sheight, width: swidth }));
    console.log(screenSize.width, screenSize.height);
  }, [screenSize.width]);

  useEffect(() => {
    if (errorMsg) return;
    console.log(authUser);
  }, [errorMsg, authUser]);

  //to check if our user is logged in or not
  useEffect(() => {
    if (!loading && !authUser) router.push('/login');
  }, [authUser, loading]);

  return (
    <div className={`${styless.loginMainContainer}`}>
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
      {!!vidIsOpen && (
        <div className={`${styless.introVideoContainer}`}>
          <video ref={vidRef} onEnded={() => router.push('/')}>
            <source src="/videos/loginIntro.mp4" type="video/mp4" />
          </video>
        </div>
      )}
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
    </div>
  );
};

export default LoginScreen;
