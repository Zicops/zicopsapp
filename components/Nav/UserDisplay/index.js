import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import { truncateTo16 } from '../Logic/nav.helper';

import styles from '../nav.module.scss';
import RightDropDownMenu from '../RightDropDownMenu';

const UserDisplay = () => {
  const userProfileData = useRecoilValue(UserStateAtom);
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profilepic}>
          <img
            src={`${
              userProfileData?.photo_url ? userProfileData?.photo_url : '/images/swagDP.jpg'
            }`}
          />
        </div>
        <div className={styles.profilename}>
          <div className={styles.name}>
            {userProfileData?.first_name
              ? truncateTo16(`${userProfileData?.first_name} ${userProfileData?.last_name}`)
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
