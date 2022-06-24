import styles from '../userProfile.module.scss';
import { userProfileDetailsData } from '../Logic/userProfile.helper';

const ProfilePersonelDetail = () => {
  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img src="/images/profile_picture.png" alt="not found" width={200} />
        </div>
        <div className={`${styles.profileDetails}`}>
          {Object.keys(userProfileDetailsData).map((item, i) => (
            <span>
              <div key={i} className={`${styles.label}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}:
              </div>
              <div className={`${styles.value}`}>
                <span>{userProfileDetailsData[item]}</span>
              </div>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePersonelDetail;
