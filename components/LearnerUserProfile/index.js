import styles from './learnerUserProfile.module.scss';
import UserBody from './UserBody';
import UserHead from './UserHead';
import UserInfoWraper from './UserInfoWraper';
const LearnerUserProfile = () => {
  return (
    <>
      <div className={`${styles.learnerUserProfile}`}>
        <UserHead />
        <UserBody />
      </div>
    </>
  );
};

export default LearnerUserProfile;
