import styles from '../userProfile.module.scss';

const ProfilePersonelDetail = ({ currentUserData }) => {
  const userProfileDetailsData = {
    name: `${currentUserData?.first_name || ''} ${currentUserData?.last_name || ''}`,
    email: currentUserData?.email,
    contact: currentUserData?.phone
  };

  const userGender = currentUserData?.gender?.toLowerCase();
  let imageUrl = `/images/Avatars/${userGender}Profile.png`;
  

  return (
    <>
      <div className={`${styles.profileDetailsContainer}`}>
        <div className={`${styles.profilePicContainer}`}>
          <img src={currentUserData?.photo_url || imageUrl} alt="not found" width={200} />
        </div>
        <div className={`${styles.profileDetails}`}>
          {Object.keys(userProfileDetailsData).map((item, i) => (
            <div className={`${styles.profileDetailsField}`}>
              <div key={i} className={`${styles.label}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
              <div className={`${styles.colon}`}> : </div>
              <div className={`${styles.value}`}>{userProfileDetailsData[item]}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePersonelDetail;
