import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
import styles from '../LoginEmail/loginEmail.module.scss';

const LoginScreen = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  const { signIn, authUser, loading, logOut } = useAuthUserContext();

  const onSubmit = (event) => {
    signIn(email, password);
    event.preventDefault();
    router.push('/');
  };
  useEffect(() => {
    signIn((email = 'contact.zicops@gmail.com'), (password = 'Demo@123'));
  }, []);

  //to check if our user is logged in or not
  useEffect(() => {
    if (!loading && !authUser) router.push('/login');
  }, [authUser, loading]);

  return (
    <>
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
            // onFocus={chngeHandle}
            // style={{ margin: '5px 0px' }}
          />
          <LoginEmail type={'password'} placeholder={'Password'} />
          <div className={`${styles.small_text}`}>
            <span />
            <p>Forgot Password?</p>
          </div>

          <LoginButton title={'Login'} handleClick={onSubmit} />
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
