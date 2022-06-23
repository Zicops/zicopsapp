import { useState, useEffect } from 'react';
import styles from '../formComponents.module.scss';

const OtpInputField = ({ otpLength = 6, setotpValue, autoFill }) => {
  let otpArray = [];
  if (autoFill) {
    otpArray = autoFill.split('');
  } else {
    otpArray = Array(otpLength).fill('');
  }
  const [otpArr, setOtpArr] = useState(otpArray);

  useEffect(() => {
    if (!otpArr.includes('')) {
      let newOtp = otpArr.join('');
      setotpValue(newOtp);
    } else {
      setotpValue(null);
    }
  }, [otpArr]);
  const handleChange = (e) => {
    var max = parseInt(e.target.maxLength);

    if (e.target.value?.length >= max) {
      let modifyArr = [...otpArr];
      modifyArr[e.target.getAttribute('a-key')] = e.target.value;
      setOtpArr(modifyArr);
      if (e.target.nextElementSibling) e.target.nextElementSibling?.focus();
    }

    if (e.target.value?.length == 0) {
      let modifyArr = [...otpArr];
      modifyArr[e.target.getAttribute('a-key')] = e.target.value;
      setOtpArr(modifyArr);
      if (e.target.previousElementSibling) e.target.previousElementSibling.focus();
    }
  };

  return (
    <>
      {otpArr.map((v, i) => (
        <input
          key={i}
          type="text"
          a-key={i}
          name="code1"
          value={v ? v : ''}
          className={`${styles.value} ${styles.otp}`}
          maxLength={1}
          onChange={handleChange}
          // onKeyUp={handleChange}
          // className={`${styles.otp}`}
          autoComplete="off"
        />
      ))}
    </>
  );
};

export default OtpInputField;
