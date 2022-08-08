import { getUserData } from '@/helper/loggeduser.helper';
import { IsUpdatedAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateTo16 } from '../Logic/nav.helper';

import styles from '../nav.module.scss';
import RightDropDownMenu from '../RightDropDownMenu';

const UserDisplay = () => {
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  const [fullName, setFullName] = useState(
    `${userProfileData?.first_name} ${userProfileData?.last_name}`
  );

  useEffect(() => {
    if (!isUpdate) return;
    setFullName(`${userProfileData?.first_name} ${userProfileData?.last_name}`);
    setIsUpdate(false);
    console.log(userProfileData);
  }, [isUpdate]);

  //refill the  recoil values
  useEffect(() => {
    if (!userProfileData?.first_name && !userProfileData?.last_name) {
      const userData = getUserData();
      setUserProfileData({ ...userData });
      setFullName(`${userData?.first_name} ${userData?.last_name}`);
      return;
    }
  }, []);

  //update value in sessionStorage

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileInnerContainer}>
          <div className={styles.profilepic}>
            <img
              src={`${
                userProfileData?.photo_url ? userProfileData?.photo_url : '/images/swagDP.jpg'
              }`}
            />
          </div>

          <div className={styles.profilename}>
            <div className={styles.name}>{fullName ? truncateTo16(`${fullName}`) : ''}</div>
            <div className={styles.desg}>Zicops</div>
          </div>
        </div>
        <RightDropDownMenu />
      </div>
    </>
  );
};

export default UserDisplay;
