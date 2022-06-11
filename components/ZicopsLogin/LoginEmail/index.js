import styles from './LoginEmail.module.scss';
const LoginEmail = ({ chngeHandle, type, placeholder }) => {
  return (
    <div className={`${styles.login_email}`}>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={chngeHandle}
        style={{ border: '2px solid #6bcfcf', margin: '5px 0px' }}
      />
    </div>
  );
};

export default LoginEmail;
