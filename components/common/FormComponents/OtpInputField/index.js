import { useState, useEffect } from 'react';
import styles from '../formComponents.module.scss';

const OtpInputField = ({ otpLength = 6, handleChange, setotpValue }) => {
  const [otpArr, setOtpArr] = useState(Array(otpLength).fill(null));
  let getOtpInputValue = Array(otpLength).fill(null);
  // useEffect(() => {
  //   setotpValue(getOtpInputValue);
  // }, [getOtpInputValue]);

  handleChange = (e) => {
    var max = parseInt(e.target.maxLength);
    // var otplength = e.target.otpLength;
    // const otp = e.target.value;
    // setotpValue((InputField = otp.toString));

    if (e.target.value?.length >= max && e.target.nextElementSibling) {
      const otpData = otpArr[e.target.getAttribute('a-key')];
      // setOtpArr([...otpArr,]:e.target.value]);
      console.log(otpArr);
      // console.log(otpData);

      console.log(e.target.value);

      e.target.nextElementSibling?.focus();
    }

    if (e.target.value?.length == 0 && e.target.previousElementSibling) {
      getOtpInputValue[e.target.getAttribute('a-key')] = null;
      e.target.previousElementSibling.focus();
    }
  };

  return (
    <>
      {getOtpInputValue.map((v, i) => (
        <input
          type="text"
          a-key={i}
          name="code1"
          className={`${styles.value} ${styles.otp}`}
          maxLength={1}
          onKeyUp={handleChange}
          // className={`${styles.otp}`}
        />
      ))}
    </>
  );
};

export default OtpInputField;
