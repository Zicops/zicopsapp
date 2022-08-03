import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getUserObject, UserStateAtom } from '@/state/atoms/users.atom';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { userClient, USER_LOGIN } from 'API/UserMutations';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';

import { useMutation } from '@apollo/client';
import LoginHeadOne from '../LoginHeadOne';
import styles from '../zicopsLogin.module.scss';

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
  const [userData, setUserData] = useRecoilState(UserStateAtom);

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

    if (errorMsg) return;

    sessionStorage.setItem('tokenF', auth?.currentUser?.accessToken);

    let isError = false;
    const res = await userLogin({
      context: {
        headers: {
          Authorization: auth?.currentUser?.accessToken
            ? `Bearer ${auth?.currentUser?.accessToken}`
            : ''
        }
      }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      console.log(sessionStorage.getItem('tokenF'));
      return setToastMsg({ type: 'danger', message: 'Login Error' });
    });

    if (isError) return;

    console.log(res?.data?.login?.is_verified);
    setUserData(getUserObject(res?.data?.login));

    sessionStorage.setItem('loggedUser', JSON.stringify(res?.data?.login));

    if (!res?.data?.login?.is_verified) {
      setToastMsg({ type: 'danger', message: 'Please fill your account details!' });
      router.prefetch('/');
      setTimeout(() => {
        setVidIsOpen(true);
        vidRef.current.play();
      }, 1500);

      return;
    }
    // return router.push('/account-setup');
    //
    //return ;
    // setUserState({ ...res, tokenF: authUser?.token });
    // if (isError) return;
  };

  useEffect(() => {
    if (errorMsg) return setToastMsg({ type: 'danger', message: errorMsg });
    console.log(authUser);
  }, [errorMsg, authUser]);

  //to check if our user is logged in or not
  useEffect(() => {
    if (!loading && !authUser) router.push('/login');
  }, [authUser, loading]);

  return (
    <div className={`${styles.loginMainContainer}`}>
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
        <div className={`${styles.introVideoContainer}`}>
          <video ref={vidRef} onEnded={() => router.push('/')} disablePictureInPicture>
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
