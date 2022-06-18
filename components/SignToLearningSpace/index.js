import styles from './signToLearningSpace.module.scss';
import CongratulationsScreenButton from '../../components/common/CongratulationsScreenButton';

import OtpInputField from '../common/FormComponents/OtpInputField';
import { useState, useEffect } from 'react';

const SignToLearningSpace = () => {
  const [otpValue, setotpValue] = useState(0);
  useEffect(() => {
    console.log(otpValue);
  }, [otpValue]);

  return (
    <>
      <div className={`${styles.signToLearningSpace}`}>
        <div className={`${styles.zicops_logo}`}>
          <img src={'/images/Zicops-logo-icon.png'} width={'90px'} />
        </div>
        <div className={`${styles.heading}`}>Sign Into Your Learning Space</div>
        <div className={`${styles.sub_heading}`}>Start your first step to learning here!</div>
        <div className={`${styles.text}`}>
          Enter the security code sent on your registered email id !
        </div>
        <div className={`${styles.enter_code}`}>
          {/* var otpValue = 6; for(i = 0 ; i > otpValue ; i++ ){<OtpInput num={6} />} */}
          <OtpInputField otpLength={6} setotpValue={setotpValue} />
        </div>

        <div className={`${styles.login_button}`}>
          <CongratulationsScreenButton title={'Login'} />
        </div>
        <div className={`${styles.small_text}`}>
          Your code expires in 00:00 minutes.
          <span>
            <a id=""> Resend Code</a>
          </span>
        </div>
        <div className={`${styles.signInFooter}`}>
          <div className={`${styles.foot_text}`}>
            <a>Privacy Terms</a>
          </div>
          <div className={`${styles.foot_text}`}>
            <a>Contact Us</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignToLearningSpace;
