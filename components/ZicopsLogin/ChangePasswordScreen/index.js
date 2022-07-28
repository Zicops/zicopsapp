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
  const code = router.query?.oobCode;
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
        message: 'New Password should be same as Confirm Password field'
      });

    verifyPasswordResetCode(auth, code)
      .then((data) => {
        confirmPasswordReset(auth, code, newPassword)
          .then((data) => {
            router.push('/login');
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) =>
        setToastMsg({ type: 'danger', message: 'Reset password link is expired.' })
      );
  }

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
