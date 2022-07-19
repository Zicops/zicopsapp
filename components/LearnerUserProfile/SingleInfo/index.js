import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { useState } from 'react';
import styles from '../learnerUserProfile.module.scss';

const SingleInfo = ({ userData, isEditable = true }) => {
  const [tempData, setTempData] = useState(userData.info);

  return (
    <div className={`${styles.singleWraper}`}>
      <div className={`${styles.singleImage}`}>
        <img src={userData.image} />
      </div>
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData.text}:</div>
        {isEditable ? (
          <LabeledInput
            styleClass={`${styles.inputField}`}
            inputOptions={{
              placeholder: `Enter ${userData.text}`,
              value: tempData,
              maxLength: 60
              // isDisabled: isPreview
            }}
            changeHandler={(e) => setTempData(e.target.value)}
          />
        ) : (
          <div className={`${styles.largeText}`}>{tempData} </div>
        )}
      </div>
    </div>
  );
};

export default SingleInfo;
