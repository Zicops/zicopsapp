import { userState } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import { truncateTo16 } from '../Logic/nav.helper';

import styles from '../nav.module.scss';
import RightDropDownMenu from '../RightDropDownMenu';

const UserDisplay = () => {
  const userProfileData = useRecoilValue(userState);
  return (
    <>
      <div className={styles.profile}>
        <img
          className={styles.profilepic}
          src={`${userProfileData ? userProfileData.PhotoUrl : '/images/dp.png'}`}
        />
        <div className={styles.profilename}>
          <div className={styles.name}>
            {userProfileData
              ? truncateTo16(`${userProfileData?.firstName} ${userProfileData?.lastName}`)
              : truncateTo16('Abhishek Ghosh')}
          </div>
          <div className={styles.desg}>Zicops</div>
        </div>
        <RightDropDownMenu />
      </div>
    </>
  );
};

export default UserDisplay;
