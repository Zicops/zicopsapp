import styles from '../zicopsLogin.module.scss';
const LoginHead = ({ heading, sub_heading, text }) => {
  return (
    <>
      <div className={`${styles.zicops_logo}`}>
        <img src={'/images/Zicops-logo-icon.png'} width={'90px'} />
      </div>
      <div className={`${styles.heading}`}>{heading}</div>
      <div className={`${styles.sub_heading}`}>{sub_heading}</div>
      <div className={`${styles.text}`}>{text}</div>
    </>
  );
};

export default LoginHead;
