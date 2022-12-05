import { API_LINKS } from '@/api/api.helper';
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
  const [loading, setLoading] = useState(false);

  function handleEmail(e, setState) {
    setState(e.target.value);
  }

  async function handleSubmit() {
    const checkEmail = isEmail(sendEmail);
    if (!checkEmail) return setToastMsg({ type: 'danger', message: 'Enter valid email!!' });
    const sendData = {
      email: sendEmail
    };
    // const res = fetch('https://demo.zicops.com/um/reset-password' , sendData)

    setLoading(true);

    const data = await fetch(API_LINKS?.resetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    console.log(data?.status, 'status');
    if (data?.status === 200) {
      setLoading(false);
      router?.push('/login');
      return setToastMsg({
        type: 'success',
        message: `Send reset password mail to email: ${sendEmail}`
      });
    }

    setLoading(false);
    return;
  }

  return (
    <>
      <HomeHeader showLogin={false} showBackBtn={true} />
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Reset Password'}
          sub_heading={'Send reset email to your registered email id'}
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
            <LoginButton title={'Send Email'} handleClick={handleSubmit} isDisabled={loading} />
          </div>
          <div className={`${styles.small_text}`}>
            Did not receive email to reset password?<p onClick={handleSubmit}>Resend</p>
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
