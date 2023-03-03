import styles from '../userProfile.module.scss';

const ProfilePreferences = ({ currentUserData, imageUrl = null }) => {
  // console.log(currentUserData,'current user data');
  const preferences = currentUserData?.sub_categories?.map((item) => item?.sub_category);
  const userProfilePreferenceData = {
    base_language: 'English',
    'base_sub-category': currentUserData?.sub_category,
    'sub-category_preferences': preferences?.join(', ')
  };


  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img
            src={imageUrl || '/images/Avatars/Profile.png'}
            alt={currentUserData?.photo_url}
            width={200}
          />
        </div>
        <div className={`${styles.profileDetails}`}>
          {Object.keys(userProfilePreferenceData).map((item, i) => {
            const label = item.charAt(0).toUpperCase() + item.slice(1);
            const labelText = label.split('_').join(' ');
            return (
              <div className={`${styles.profileDetailsField}`}>
                <div key={i} className={`${styles.label}`}>
                  {labelText}
                </div>
                <div className={`${styles.colon}`}> : </div>
                <div className={`${styles.value}`}>{userProfilePreferenceData[item]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePreferences;
