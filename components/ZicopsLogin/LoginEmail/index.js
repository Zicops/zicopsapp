import styles from '../zicopsLogin.module.scss';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState, useRef } from 'react';
const LoginEmail = ({ chngeHandle, type, placeholder, tabIndex = -1, styleClass = null }) => {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);

  const passwordRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!passwordRef.current.contains(e.target) && passwordRef.current) {
        setFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [passwordRef]);

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <div
      className={`${styles.login_email} ${focus ? styles.focusEmailContainer : ''} ${styleClass}`}
      ref={passwordRef}>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={chngeHandle}
        autoComplete={'off'}
        // tabIndex={tabIndex}
        onFocus={() => setFocus(true)}
        // style={{ margin: '5px 0px' }}
      />
      <button onClick={handleShowPassword} type="button" tabIndex="-1">
        {show ? <Visibility color={'primary'} /> : <VisibilityOff sx={{ color: '#737373' }} />}
      </button>
    </div>
  );
};

export default LoginEmail;
