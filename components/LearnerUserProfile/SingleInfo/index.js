import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { changeHandler } from '@/helper/common.helper';
import { checkOrg } from '../Logic/singleInfo.helper';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
import { isDisabledArr } from '../Logic/singleInfo.helper';

const SingleInfo = ({ userData, isEditable = true, isOrg = false }) => {
  const [tempData, setTempData] = useState(userData.info);
  const [userDataMain, setUserDataMain] = useRecoilState(UserStateAtom);
  const [userMetaData, setUserMetaData] = useRecoilState(UsersOrganizationAtom);

  function checkOrg(e, isOrg, userData) {
    if (isOrg) {
      return !!e
        ? changeHandler(e, userMetaData, setUserMetaData)
        : userMetaData[`${userData.inputName}`];
    }
    return !!e
      ? changeHandler(e, userDataMain, setUserDataMain)
      : userDataMain[`${userData.inputName}`];
  }

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
              value: checkOrg(null, isOrg, userData),
              maxLength: 60,
              isDisabled: isDisabledArr.includes(userData.label)
            }}
            changeHandler={(e) => checkOrg(e, isOrg, userData)}
          />
        ) : (
          <div className={`${styles.largeText}`}>{checkOrg(null, isOrg, userData)} </div>
        )}
      </div>
    </div>
  );
};

export default SingleInfo;
