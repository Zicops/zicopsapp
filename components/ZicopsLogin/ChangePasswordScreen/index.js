import { isPassword } from '@/helper/common.helper';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
import styles from '../zicopsLogin.module.scss';

const ChangePasswordScreen = ({ setPage }) => {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();
  const code = router.query?.oobCode;
  const userMail = router.query?.email || '';
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');

  function handleNewPassword(e) {
    setNewPassword(e.target.value);
  }

  function handleConfNewPassword(e) {
    setConfNewPassword(e.target.value);
  }

  function handleSubmit() {
    if (newPassword !== confNewPassword)
      return setToastMsg({
        type: 'danger',
        message: 'New password should be same as confirm password field'
      });

    const checkPassword = isPassword(newPassword);
    if (!!checkPassword.length)
      return setToastMsg({ type: 'danger', message: `${checkPassword[0]}` });

    verifyPasswordResetCode(auth, code)
      .then((data) => {
        confirmPasswordReset(auth, code, newPassword)
          .then((data) => {
            setToastMsg({ type: 'success', message: 'Password updated successfully!' });
            router.push('/login');
          })
          .catch((error) => {
            const err = error.code.slice(5).split('-').join(' ');
            setToastMsg({ type: 'danger', message: err });
          });
      })
      .catch((error) => {
        setToastMsg({
          type: 'info',
          message:'Your current invite link has expired. Kindly trigger a new invite link.'
            // 'Reset password link has expired. Please enter your email for latest reset password link.'
        });
        router.push('/forgot-password');
      });
  }

  useEffect(() => {
    //added empty code check
    if(!code?.length) return;
    verifyPasswordResetCode(auth, code)
      .then((data) => {
        return;
      })
      .catch((error) => {
        setToastMsg({
          type: 'info',
          message:
            'Your current invite link has expired. Kindly trigger a new invite link.'
        });
        router.push(`/forgot-password?email=${userMail}`, '/forgot-password');
      });
  }, []);

  return (
    <>
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Change Password'}
          sub_heading={'You are required to change the default password!'}
          info={
            <Tooltip
              placement="right"
              title="It is recommended to use strong passwords that are at least 8 characters long and a combination of uppercase and lowercase letters, numbers and symbols."
              arrow
              className={`${styles.password_info}`}>
              <InfoIcon fontSize={'small'} color={'primary'} />
            </Tooltip>
          }
        />
        <div className="login_body">
          {/* <LoginEmail placeholder={'Enter current password'} chngeHandle={handleCurrentPassword} /> */}
          <LoginEmail
            placeholder={'Enter new password'}
            chngeHandle={(e) => handleNewPassword(e)}
            tabIndex={1}
          />
          <LoginEmail
            placeholder={'Re-enter new password'}
            chngeHandle={(e) => handleConfNewPassword(e)}
            tabIndex={2}
          />
          <div className="change_buttons">
            {/* <LoginButton title={'Cancel'} /> */}
            <LoginButton title={'Change'} handleClick={handleSubmit} />
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
