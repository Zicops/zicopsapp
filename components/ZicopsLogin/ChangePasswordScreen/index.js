import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
const ChangePasswordScreen = () => {
  return (
    <>
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Change Password'}
          sub_heading={'You are required to change the default password!'}
        />
        <div className="login_body">
          <LoginEmail type={'password'} placeholder={'Enter current password'} />
          <LoginEmail type={'password'} placeholder={'Enter new password'} />
          <LoginEmail type={'password'} placeholder={'Re-enter new password'} />
          <div className="change_buttons">
            <LoginButton title={'Cancel'} />
            <LoginButton title={'Change'} />
          </div>
        </div>
      </ZicopsLogin>
      <style jsx>{`
        .login_body {
          width: 400px;
        }
        .change_buttons {
          display: flex;
          gap: 20px;
        }
      `}</style>
    </>
  );
};

export default ChangePasswordScreen;
