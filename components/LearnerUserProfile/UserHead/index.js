import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
const UserHead = () => {
  function truncateTo16(str) {
    return str.length > 16 ? str.substring(0, 13) + '...' : str;
  }
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(`${userProfileData?.first_name} ${userProfileData?.last_name}`);
  }, []);
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

      <div className={`${styles.userName}`}>
        {userProfileData?.first_name ? `${fullName}` : 'Aakash Chakraborty'}
      </div>
      <div className={`${styles.userRole}`}>Learning manager at accenture</div>
    </div>
  );
};

export default UserHead;
