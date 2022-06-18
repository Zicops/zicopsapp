import styles from './otp.module.scss';
const OtpInput = () => {
  return (
    <>
      <div className={`${styles.otp}`}>
        <input type="text" name="code1" className={`${styles.value}`} maxLength={1} />
      </div>
    </>
  );
};

export default OtpInput;
