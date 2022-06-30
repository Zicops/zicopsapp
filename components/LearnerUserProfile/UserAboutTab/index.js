import styles from '../learnerUserProfile.module.scss';
import SingleUserDetail from '../SingleUserDetail';
import { userData, orgData, profilePref } from '../Logic/userData.helper.js';
const UserAboutTab = () => {
  return (
    <div className={`${styles.userAboutTab}`}>
      <SingleUserDetail headingText={'Personal Details'} userData={userData} />
      <SingleUserDetail headingText={'Organization Details'} userData={orgData} />
      <SingleUserDetail headingText={'Profile Preferences'} userData={profilePref} />
    </div>
  );
};

export default UserAboutTab;
