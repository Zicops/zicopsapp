import styles from '../userProfile.module.scss';
import { profilePreferencesData } from '../Logic/userProfile.helper';

const ProfilePreferences = () => {
  return (
    <>
      <div className={`${styles.profilePreferencesContainer}`}>
        <span>
          <div className={`${styles.label}`}>Base Language:</div>
          <div className={`${styles.value}`}>
            <span>{profilePreferencesData.baseLanguage}</span>
          </div>
        </span>
        <span>
          <div className={`${styles.label}`}>Base Sub-Category:</div>
          <div className={`${styles.value}`}>
            <span>{profilePreferencesData.baseSubCategory}</span>
          </div>
        </span>
        <span>
          <div className={`${styles.label}`}>Sub-category Preferences:</div>
          <div className={`${styles.value}`}>
            <span>{profilePreferencesData.subCategoryPrefrences}</span>
          </div>
        </span>
      </div>
    </>
  );
};

export default ProfilePreferences;
