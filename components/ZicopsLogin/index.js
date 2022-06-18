import LoginFooter from './LoginFooter';
import styles from './zicopsLogin.module.scss';
const ZicopsLogin = ({ children }) => {
  return (
    <>
      <div className={`${styles.zicops_login}`}>
        {children}
        <LoginFooter />
      </div>
    </>
  );
};

export default ZicopsLogin;
