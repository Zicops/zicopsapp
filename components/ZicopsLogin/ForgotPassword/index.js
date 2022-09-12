import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import HomeHeader from '@/components/HomePage/HomeHeader';
import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
import styles from '../zicopsLogin.module.scss';

const ForgotPassword = ({ setPage }) => {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();
  const [sendEmail, setSendEmail] = useState('');

  function handleEmail(e, setState) {
    setState(e.target.value);
  }

  function handleSubmit() {
    const checkEmail = isEmail(sendEmail);
    if (!checkEmail) return setToastMsg({ type: 'danger', message: 'Enter valid email!!' });
  }

  return (
    <>
      <HomeHeader showLogin={false} showBackBtn={true} />
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Reset Password'}
          sub_heading={'Start your first step to learning here!'}
        />
        <div className="login_body">
          {/* <input
            className={`${styles.login_email_input}`}
            type={'email'}
            placeholder={'Email address'}
            chngeHandle={(e) => handleEmail(e)}
            tabIndex={1}
          /> */}
          <LabeledInput
            styleClass={styles.login_email_input}
            inputOptions={{
              inputName: 'email',
              placeholder: 'Email address',
              value: sendEmail
            }}
            changeHandler={(e) => handleEmail(e, setSendEmail)}
          />

          <div className="change_buttons">
            <LoginButton title={'Send Email'} handleClick={handleSubmit} />
          </div>
          <div className={`${styles.small_text}`}>
            Did not received mail to reset password?<p>Resend</p>
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

export default ForgotPassword;
