import styles from './loginFooter.module.scss';
const LoginFooter = () => {
  return (
    <div className={`${styles.login_Footer}`}>
      <div className={`${styles.foot_text}`}>
        <a>Privacy Terms</a>
      </div>
      <div className={`${styles.foot_text}`}>
        <a>Contact Us</a>
      </div>
    </div>
  );
};

export default LoginFooter;
