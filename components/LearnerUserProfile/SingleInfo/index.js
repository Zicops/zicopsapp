import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';

const SingleInfo = ({ userData, isEditable = true }) => {
  const [tempData, setTempData] = useState(userData.info);
  const [userDataMain, setUserDataMain] = useRecoilState(UserStateAtom);

  switch (tempData) {
    case 'Name':
      setTempData(
        userDataMain ? `${userDataMain.first_name} ${userDataMain?.last_name}` : tempData
      );
      break;
    case 'Email':
      setTempData(userDataMain ? userDataMain?.email : tempData);
      break;
    case 'Contact':
      setTempData(userDataMain ? userDataMain?.phone : tempData);
      break;
  }

  return (
    <div className={`${styles.singleWraper}`}>
      <div className={`${styles.singleImage}`}>
        <img src={userData.image || userDataMain?.photo_url} />
      </div>
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData.text}:</div>
        {isEditable ? (
          <LabeledInput
            styleClass={`${styles.inputField}`}
            inputOptions={{
              placeholder: `Enter ${userData.text}`,
              value: tempData,
              maxLength: 60,
              isDisabled: userData.text === 'Email'
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
