import ZicopsLogin from '..';
import LoginButton from '../LoginButton';
import LoginEmail from '../LoginEmail';
import LoginHeadOne from '../LoginHeadOne';
import InfoIcon from '@mui/icons-material/Info';
import {Tooltip} from "@mui/material";
import styles from "../zicopsLogin.module.scss";
const ChangePasswordScreen = ({ setPage }) => {

  return (
    <>
      <ZicopsLogin>
        <LoginHeadOne
          heading={'Change Password'}
          sub_heading={'You are required to change the default password!'}
          info={(
              <Tooltip placement="right" title="Password info goes here" arrow className={`${styles.password_info}`}>
                <InfoIcon fontSize={'small'} color={'primary'} />
              </Tooltip>
          )}
        />
        <div className="login_body">
          <LoginEmail placeholder={'Enter current password'} />
          <LoginEmail placeholder={'Enter new password'} />
          <LoginEmail placeholder={'Re-enter new password'} />
          <div className="change_buttons">
            <LoginButton title={'Cancel'} />
            <LoginButton title={'Change'} handleClick={()=>
    setPage(1)} />
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
