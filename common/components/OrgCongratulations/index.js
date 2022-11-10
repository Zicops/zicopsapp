import React, { useState } from 'react';
import Button from '../Button';
import styles from './orgCongratulations.module.scss';

const OrgCongratulations = ({ title, shape, clickHandle = () => {} }) => {
  const [showCongrats, setShowCongrats] = useState(true);

  const customStyle = {};
  if (shape === 'square') {
    customStyle.height = '65%';
    customStyle.width = '40%';
  }

  return (
    <>
      {showCongrats && (
        <div className={`${styles.overlay}`}>
          <div className={`${styles.congratulations_body}`} style={customStyle}>
            <div>
              <img src={'/images/svg/org_congrats_frame.svg'} alt="" />
            </div>
            <p>
              {title ||
                'Thankyou for registering with Zicops Learning Spaces. Your details have been submitted for verification and we will reach out to you in 2 business days.'}
            </p>
            {/* <p>{title}</p> */}
            <div className={`${styles.btn_container}`}>
              <Button size="small" isBold="bold" clickHandler={clickHandle}>
                Ok
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrgCongratulations;
