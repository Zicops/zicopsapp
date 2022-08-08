import { getUserData } from '@/helper/loggeduser.helper';
import { UserStateAtom, IsUpdatedAtom, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
const UserHead = () => {
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  const [userProfileData, setUserProfiledata] = useRecoilState(UserStateAtom);
  const [userAccountData, setUserAccountdata] = useRecoilState(UsersOrganizationAtom);
  const [fullName, setFullName] = useState(
    `${userProfileData?.first_name} ${userProfileData?.last_name}`
  );

  //used to not immedialty update the Full name state
  useEffect(() => {
    if (!isUpdate) return;
    setFullName(`${userProfileData?.first_name} ${userProfileData?.last_name}`);
    sessionStorage.setItem('loggedUser', JSON.stringify({ ...userProfileData }));
    sessionStorage.setItem('userAccountSetupData', JSON.stringify({ ...userAccountData }));
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    if (!userProfileData?.first_name && !userProfileData?.last_name) {
      const userData = getUserData();
      const data = JSON.parse(sessionStorage.getItem('userAccountSetupData'));
      setUserAccountdata({ ...data });
      setUserProfiledata({ ...userData });
      setFullName(`${userData?.first_name} ${userData?.last_name}`);
      return;
    }
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

      <div className={`${styles.userName}`}>{fullName ? `${fullName}` : ''}</div>
      <div className={`${styles.userRole}`}>
        {userAccountData?.organization_role
          ? `${userAccountData?.organization_role} at ${userAccountData?.organization_name}`
          : ''}
      </div>
    </div>
  );
};

export default UserHead;
