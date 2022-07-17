import styles from '../learnerUserProfile.module.scss';
import SingleUserDetail from '../SingleUserDetail';
import { userData, orgData, profilePref, subCategory } from '../Logic/userData.helper.js';
import CategoryPreferences from '../CategoryPreferences';
const UserAboutTab = () => {
  return (
    <div className={`${styles.userAboutTab}`}>
      <SingleUserDetail headingText={'Personal Details'} userData={userData} />
      <SingleUserDetail headingText={'Organization Details'} userData={orgData} />
      <SingleUserDetail headingText={'Profile Preferences'} userData={profilePref} />
      {/* {userData.map((v) => (
        <CategoryPreferences userData={v} />
      ))} */}
      <CategoryPreferences userData={subCategory} />
    </div>
  );
};

export default UserAboutTab;
