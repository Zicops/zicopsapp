import { useEffect, useRef } from 'react';
import styles from '../zicopsLogin.module.scss';

const LoginButton = ({ title, handleClick = () => {}, resend_code, text, isDisabled = false }) => {
  const btnRef = useRef(null);
  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      e.key === 'Enter' ? btnRef?.current?.click() : null;
    });
  }, []);
  return (
    <div className={`${styles.login_Button}`}>
      <button ref={btnRef} onClick={handleClick} type="submit" value="submit" disabled={isDisabled}>
        {title}
      </button>
      <div className={`${styles.small_text}`}>
        {text}
        <span>
          <a id="">{resend_code}</a>
        </span>
      </div>
    </div>
  );
};

export default LoginButton;
