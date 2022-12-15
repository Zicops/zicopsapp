import styles from '../zicopsLogin.module.scss';
const LoginFooter = () => {
  return (
    <div className={`${styles.login_Footer}`}>
      <div className={`${styles.foot_text}`}>
        <a href="/static/terms.html">Terms of Use</a>
      </div>
      <div className={`${styles.foot_text}`}>
        <a href="/static/privacy.html">Privacy Policy</a>
      </div>
    </div>
  );
};

export default LoginFooter;
