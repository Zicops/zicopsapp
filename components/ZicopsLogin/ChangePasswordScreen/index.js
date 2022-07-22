import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import styles from '../zicopsLogin.module.scss';
import { useState } from 'react';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';

const ChangePasswordScreen = ({ setPage }) => {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();
  const code = router.query?.oobCode || 'sgWcZL0ohfUnds2dXmiqiIIZqaNbNmyxkx1kv7bkEvwAAAGCJqr1pA';
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');

  function handleCurrentPassword(e) {
    setCurrentPassword(e.target.value);
    if (currentPassword === 'Password')
      return setToastMsg({ type: 'danger', message: 'Enter correct password' });
  }

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
        message: 'New Password should be same as Confirm Password field'
      });
    console.log(code, newPassword);

    verifyPasswordResetCode(auth, 'sgWcZL0ohfUnds2dXmiqiIIZqaNbNmyxkx1kv7bkEvwAAAGCJqr1pA')
      .then((data) => {
        confirmPasswordReset(auth, code, newPassword)
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));
  }

  //('https://zicops-one.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=sgWcZL0ohfUnds2dXmiqiIIZqaNbNmyxkx1kv7bkEvwAAAGCJqr1pA&apiKey=AIzaSyD05Uj8S-YumeJUiM4xuO8YFP7rjLJbrP8&lang=en');

  return (
    <>
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Change Password'}
          sub_heading={'You are required to change the default password!'}
          info={
            <Tooltip
              placement="right"
              title="Password info goes here"
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
          />
          <LoginEmail
            placeholder={'Re-enter new password'}
            chngeHandle={(e) => handleConfNewPassword(e)}
          />
          <div className="change_buttons">
            <LoginButton title={'Cancel'} />
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
