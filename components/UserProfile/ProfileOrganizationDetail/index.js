import styles from '../userProfile.module.scss';

const ProfileOrganizationDetail = ({ currentUserData }) => {
  // console.log(currentUserData);
  const userOrganizationData = {
    organization: 'Zicops',
    organization_unit: 'Zicops,India',
    learning_space_role: currentUserData?.role || 'Learner',
    role_in_organization: currentUserData?.organization_role,
    employee_id: currentUserData?.employee_id
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
          {Object.keys(userOrganizationData).map((item, i) => {
            const label = item.charAt(0).toUpperCase() + item.slice(1);
            const labelText = label.split('_').join(' ');
            return (
              <div className={`${styles.profileDetailsField}`}>
                <div key={i} className={`${styles.label}`}>
                  {labelText}
                </div>
                <div className={`${styles.colon}`}> : </div>
                <div className={`${styles.value}`}>{userOrganizationData[item]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileOrganizationDetail;
