import styles from '../userProfile.module.scss';
import { profilePreferencesData } from '../Logic/userProfile.helper';

const ProfilePreferences = ({ currentUserData }) => {
  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img
            src={currentUserData?.photo_url || '/images/profile_picture.png'}
            alt={currentUserData?.photo_url}
            width={200}
          />
        </div>
        <div className={`${styles.profileDetails}`}>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Base Language</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profilePreferencesData.baseLanguage}</div>
          </div>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Base Sub-Category</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profilePreferencesData.baseSubCategory}</div>
          </div>
          <div className={`${styles.profileDetailsField}`}>
            <div className={`${styles.label}`}>Sub-category Preferences</div>
            <div className={`${styles.colon}`}> : </div>
            <div className={`${styles.value}`}>{profilePreferencesData.subCategoryPrefrences}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePreferences;
