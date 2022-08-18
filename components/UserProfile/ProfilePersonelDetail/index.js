import styles from '../userProfile.module.scss';

const ProfilePersonelDetail = ({ currentUserData }) => {
  const userProfileDetailsData = {
    name: `${currentUserData?.first_name} ${currentUserData?.last_name}`,
    email: currentUserData?.email,
    contact: currentUserData?.phone
  };

  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img
            src={currentUserData?.photo_url || '/images/profile_picture.png'}
            alt="not found"
            width={200}
          />
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
