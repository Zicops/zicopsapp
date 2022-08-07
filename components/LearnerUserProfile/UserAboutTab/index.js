import styles from '../learnerUserProfile.module.scss';
import SingleUserDetail from '../SingleUserDetail';
import { userData, orgData, profilePref, subCategory } from '../Logic/userData.helper.js';
import CategoryPreferences from '../CategoryPreferences';
import { useState } from 'react';
import useHandleUserUpdate from '../Logic/useHandleUserUpdate';

const UserAboutTab = () => {
  const [isEditable, setIsEditable] = useState(null);
  const { updateAboutUser, updateUserOrganizationDetails } = useHandleUserUpdate();

  return (
    <div className={`${styles.userAboutTab}`}>
      <SingleUserDetail
        isEditable={isEditable === 1}
        toggleEditable={() => setIsEditable((prev) => (prev === 1 ? null : 1))}
        headingText={'Personal Details'}
        userData={userData}
        updateHandle={updateAboutUser}
      />
      <SingleUserDetail
        isEditable={isEditable === 2}
        toggleEditable={() => setIsEditable((prev) => (prev === 2 ? null : 2))}
        headingText={'Organization Details'}
        userData={orgData}
        isOrg={true}
        updateHandle={updateUserOrganizationDetails}
      />
      <SingleUserDetail
        isEditable={isEditable === 3}
        toggleEditable={() => setIsEditable((prev) => (prev === 3 ? null : 3))}
        headingText={'Profile Preferences'}
        userData={profilePref}
        isOrg={true}
      />
      {/* {userData.map((v) => (
        <CategoryPreferences userData={v} />
      ))} */}
      <CategoryPreferences userData={subCategory} />
    </div>
  );
};

export default UserAboutTab;
