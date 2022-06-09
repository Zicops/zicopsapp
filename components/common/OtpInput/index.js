import styles from './otp.module.scss';
const OtpInput = ({ num }) => {
  return (
    <>
      <div className={`${styles.otp}`}>
        <input type="text" name="code1" className={`${styles.value}`} maxLength={1} num={num} />
      </div>
    </>
  );
};

export default OtpInput;
