import { UserStateAtom, IsUpdatedAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
const UserHead = () => {
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const [fullName, setFullName] = useState('');

  //used to not immedialty update the Full name state
  useEffect(() => {
    if (!isUpdate) return;
    setFullName(`${userProfileData?.first_name} ${userProfileData?.last_name}`);
    setIsUpdate(false);
  }, [isUpdate]);

  return (
    <div className={`${styles.userHead}`}>
      <div className={`${styles.editIcon}`}>
        <img src="/images/svg/edit.svg" />
      </div>
      <div className={`${styles.userImageContainer}`}>
        <div className={`${styles.userImage}`}>
          <img
            src={`${
              userProfileData?.photo_url ? userProfileData?.photo_url : '/images/swagDP.jpg'
            }`}
          />
        </div>
        <div className={`${styles.editFillIcon}`}>
          <img src="/images/svg/edit-black.svg" />
        </div>
      </div>

      <div className={`${styles.userName}`}>{fullName ? `${fullName}` : 'Abhishek Gosh'}</div>
      <div className={`${styles.userRole}`}>Learning manager at accenture</div>
    </div>
  );
};

export default UserHead;
