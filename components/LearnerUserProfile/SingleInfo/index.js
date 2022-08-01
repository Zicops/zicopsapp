import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';

const SingleInfo = ({ userData, isEditable = true }) => {
  const [tempData, setTempData] = useState(userData.info);
  const [userDataMain, setUserDataMain] = useRecoilState(UserStateAtom);

  return (
    <div className={`${styles.singleWraper}`}>
      <div className={`${styles.singleImage}`}>
        <img src={userData.image || userDataMain?.photo_url} />
      </div>
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData.label}:</div>
        {isEditable ? (
          <LabeledInput
            styleClass={`${styles.inputField}`}
            inputOptions={{
              inputName: `${userData.inputName}`,
              placeholder: `Enter ${userData.label}`,
              value: userDataMain[`${userData.inputName}`],
              maxLength: 60,
              isDisabled: userData.label === 'Email'
            }}
            changeHandler={(e) =>
              setUserDataMain({ ...userDataMain, [e.target.name]: e.target.value })
            }
          />
        ) : (
          <div className={`${styles.largeText}`}>{userDataMain[`${userData.inputName}`]} </div>
        )}
      </div>
    </div>
  );
};

export default SingleInfo;
