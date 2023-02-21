import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
import styles from '../zicopsLogin.module.scss';

import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import HomeHeader from '@/components/HomePage/HomeHeader';
import { useLoginMutation } from '@/helper/useLoginMutation';

const LoginScreen = ({ setPage }) => {
  // const [userLogin, { loading: loginLoading, error: loginError }] = useMutation(USER_LOGIN, {
  //   client: userClient
  // });

  const { loginUser } = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [vidIsOpen, setVidIsOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const vidRef = useRef();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  // const [error, setError] = useState(null);

  const router = useRouter();

  const { signIn, authUser, loading, errorMsg, logOut } = useAuthUserContext();

  useEffect(() => {
    if (sessionStorage?.length && userData?.id && userData?.is_verified)
      return router.push('/learning-spaces');
  }, [userData?.id]);

  const handleEmail = (e) => {
    setDisableBtn(false);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setDisableBtn(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const checkEmail = isEmail(email);
    if (!checkEmail) return setToastMsg({ type: 'danger', message: 'Enter valid email!!' });

    if (!password) return setToastMsg({ type: 'danger', message: 'Enter password!!' });

    let _email = email?.toLowerCase();

    const userData = await signIn(_email, password);

    if (userData) loginUser();
  };

  // async function loginUser() {
  //   sessionStorage.setItem('tokenF', auth?.currentUser?.accessToken);
  //   let isError = false;
  //   const res = await userLogin({
  //     context: {
  //       headers: {
  //         Authorization: auth?.currentUser?.accessToken
  //           ? `Bearer ${auth?.currentUser?.accessToken}`
  //           : ''
  //       }
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //     isError = !!err;
  //     console.log(sessionStorage.getItem('tokenF'));
  //     return setToastMsg({ type: 'danger', message: 'Login Error' });
  //   });

  //   if (isError) return;

  //   // TODO: udpate this later and move it according to org flow
  //   // const orgRes = await loadQueryDataAsync(
  //   //   GET_USER_ORGANIZATIONS,
  //   //   { user_id: res?.data?.login?.id },
  //   //   {},
  //   //   userQueryClient
  //   // );
  //   // // console.log(orgRes);
  //   // if(orgRes?.getUserOrganizations?.length){
  //   //   setUserOrgData(orgRes?.getUserOrganizations[0]);
  //   // }
  //   // sessionStorage?.setItem(
  //   //   'lspData',
  //   //   JSON.stringify({ user_lsp_id: orgRes?.getUserOrganizations?.[0]?.user_lsp_id })
  //   // );

  //   // if (isError) return;
  //   if (res?.data?.login?.status === USER_STATUS.disable)
  //     return setToastMsg({ type: 'danger', message: 'Login Error' });

  //   setUserData(getUserObject(res?.data?.login));
  //   sessionStorage.setItem('loggedUser', JSON.stringify(res?.data?.login));
  //   localStorage.setItem(GIBBERISH_VALUE_FOR_LOGIN_STATE, GIBBERISH_VALUE_FOR_LOGIN_STATE);

  //   if (!!res?.data?.login?.is_verified) {
  //     // setToastMsg({ type: 'danger', message: 'Please fill your account details!' });
  //     router.prefetch('/learning-spaces');
  //     setVidIsOpen(true);
  //     vidRef.current.play();
  //     // setTimeout(() => {
  //     // }, 1500);
  //     return;
  //   }

  //   return router.push('/learning-spaces');
  //   return router.push('/account-setup');
  // }

  useEffect(() => {
    if (errorMsg) return setToastMsg({ type: 'danger', message: errorMsg });
    // console.log(authUser);
  }, [errorMsg, authUser]);

  //to check if our user is logged in or not
  // useEffect(() => {
  //   if (!loading && !authUser && ) router.push('/login');
  // }, [authUser, loading]);

  return (
    <div className={`${styles.loginMainContainer}`}>
      <HomeHeader showLogin={false} />

      <ZicopsLogin>
        <LoginHeadOne
          heading={'Sign Into Your Learning Space'}
          sub_heading={'Start your first step to learning here!'}
        />
        <form className="login_body" onSubmit={handleSubmit}>
          {/* <input
            className={`${styles.login_email_input}`}
            type={'email'}
            placeholder={'Email address'}
            onChange={handleEmail}
            tabIndex={1}
            // onFocus={chngeHandle}
            // style={{ margin: '5px 0px' }}
          /> */}
          <LabeledInput
            styleClass={styles.login_email_input}
            inputOptions={{
              inputName: 'email',
              placeholder: 'Email address',
              value: email
            }}
            changeHandler={(e) => handleEmail(e, setEmail)}
          />
          <LoginEmail type={'password'} placeholder={'Password'} chngeHandle={handlePassword} />
          <div className={`${styles.small_text}`}>
            <span />
            <p
              onClick={() => {
                router.push('/forgot-password');
              }}>
              Forgot Password?
            </p>
          </div>

          <LoginButton title={'Login'} isDisabled={disableBtn} />
        </form>
      </ZicopsLogin>
      {!!vidIsOpen && (
        <div className={`${styles.introVideoContainer}`}>
          <video
            ref={vidRef}
            onEnded={() => router.push('/learning-spaces')}
            disablePictureInPicture>
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
