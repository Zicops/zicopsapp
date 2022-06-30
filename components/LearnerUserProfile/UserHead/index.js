import styles from '../learnerUserProfile.module.scss';
const UserHead = () => {
  return (
    <div className={`${styles.userHead}`}>
      <div className={`${styles.editIcon}`}>
        <img src="/images/svg/edit.svg" />
      </div>

      <div className={`${styles.userImage}`}>
        <img src="/images/profile_picture.png" />
        <div className={`${styles.editFillIcon}`}>
          <img src="/images/svg/edit-black.svg" />
        </div>
      </div>

      <div className={`${styles.userName}`}>Aakash Chakraborty</div>
      <div className={`${styles.userRole}`}>Learning manager at accenture</div>
    </div>
  );
};

export default UserHead;
