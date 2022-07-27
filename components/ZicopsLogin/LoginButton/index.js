import styles from '../zicopsLogin.module.scss';

const LoginButton = ({ title, handleClick, resend_code, text }) => {
  return (
    <div className={`${styles.login_Button}`}>
      <button onClick={handleClick}>{title}</button>
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
