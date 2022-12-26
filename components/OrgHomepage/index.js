import styles from './orgHomepage.module.scss';
import LoginEmail from '../ZicopsLogin/LoginEmail';
import { useEffect, useState, useRef } from 'react';
import LabeledInput from '../common/FormComponents/LabeledInput';
import LoginButton from '../ZicopsLogin/LoginButton/index.js';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilState } from 'recoil';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { useRouter } from 'next/router';
import { GIBBERISH_VALUE_FOR_LOGIN_STATE, USER_STATUS } from '@/helper/constants.helper';
import { getUserObject, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';

export default function OrgHomepage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);
  const [vidIsOpen, setVidIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  // const [userData, setUserData] = useRecoilState(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const vidRef = useRef();

  const { signIn, authUser, loading, errorMsg, logOut } = useAuthUserContext();

  const router = useRouter();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setDisableBtn(false);
    console.log('password received');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setDisableBtn(false);
    console.log('password received');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    const checkEmail = isEmail(email);
    if (!checkEmail) return setToastMsg({ type: 'danger', message: 'Enter valid email!!' });

    if (!password) return setToastMsg({ type: 'danger', message: 'Enter password!!' });

    const userData = await signIn(email, password);

    if (userData) loginUser;
  };

  async function loginUser() {
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

    if (res?.data?.login?.status === USER_STATUS.disable)
      return setToastMsg({ type: 'danger', message: 'Login Error' });

    setUserOrgData(getUserObject(res?.data?.login));
    sessionStorage.setItem('loggedUser', JSON.stringify(res?.data?.login));
    localStorage.setItem(GIBBERISH_VALUE_FOR_LOGIN_STATE, GIBBERISH_VALUE_FOR_LOGIN_STATE);

    if (!!res?.data?.login?.is_verified) {
      router.prefetch('/learning-spaces');
      setVidIsOpen(true);
      vidRef.current.play();
      return;
    }

    return router.push('/learning-spaces');
    return router.push('/account-setup');
  }

  useEffect(() => {
    if (errorMsg) return setToastMsg({ type: 'danger', message: errorMsg });
  }, [errorMsg, authUser]);

  return (
    <div className={`${styles.main_cont}`}>
      <div className={`${styles.left_cont}`}>
        <img src="/images/orgHomepageZ.png" alt="" />
        <div className={`${styles.left_cont_text}`}>
          <div className={`${styles.left_cont_maintext}`}>
            <p>Welcome To</p>
            <p>Amdocs</p>
            <p>learning space</p>
          </div>
          <div className={`${styles.left_cont_supporttext}`}>
            <p>Comprehensive Learning for sustainable growth</p>
          </div>
        </div>
      </div>

      <div className={`${styles.right_cont}`}>
        <div className={`${styles.right_div}`}>
          <div className={`${styles.icon_logo}`}>
            <img src="/images/svg/amdocsicon.svg" alt="" />
            <p>Amdocs</p>
          </div>
          <div className={`${styles.login_deets}`}>
            <p>Sign into your Learning space</p>
            <form onSubmit={handleSubmit}>
              <LabeledInput
                styleClass={styles.login_email_input}
                inputOptions={{
                  inputName: 'email',
                  placeholder: 'Enter Username',
                  value: email
                }}
                changeHandler={(e) => handleEmail(e, setEmail)}
              />
              <LoginEmail
                type={'password'}
                placeholder={'Enter Password'}
                chngeHandle={handlePassword}
                styleClass={styles.password}
              />
              <p
                className={`${styles.forgot_password}`}
                onClick={() => {
                  router.push('/forgot-password');
                }}>
                Forgot Password?
              </p>
              <LoginButton title={'Login'} isDisabled={disableBtn} />
            </form>
          </div>

          <div className={`${styles.empowered}`}>
            <p>Empowered by Zicops</p>
          </div>
        </div>
      </div>
    </div>
  );
}
