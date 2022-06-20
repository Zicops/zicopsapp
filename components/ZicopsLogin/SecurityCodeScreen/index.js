import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHead from '../LoginHead';
const SecurityCodeScreen = () => {
  return (
    <>
      <ZicopsLogin>
        <LoginHead
          heading={'Sign Into Your Learning Space'}
          sub_heading={'Start your first step to learning here!'}
          text={'Enter the security code sent on your registered email id!'}
        />
        <div className="resetBody">
          <LoginEmail type={'text'} placeholder={' Security Code'} />
          <LoginButton
            title={'Login'}
            text={'Your code expires in 00:00 minutes. '}
            resend_code={'Resend Code'}
          />
        </div>
      </ZicopsLogin>
      <style jsx>{`
        .resetBody {
          width: 400px;
        }
      `}</style>
    </>
  );
};

export default SecurityCodeScreen;
