import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';

const LoginScreen = ({setPage}) => {
  return (
    <>
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Sign Into Your Learning Space'}
          sub_heading={'Start your first step to learning here!'}
        />
        <div className="login_body">
          <LoginEmail type={'email'} placeholder={'Email address'} />
          <LoginEmail type={'password'} placeholder={'Password'} />
          <div className="small_text">Forgot Password?</div>
          <LoginButton title={'Login'} handleClick={() => setPage(3)} />
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
