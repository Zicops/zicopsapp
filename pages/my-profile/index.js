import LearnerUserProfile from '../../components/LearnerUserProfile';
import styles from './myProfile.module.scss';
const MyProfile = () => {
  return (
    <>
      <div className={`${styles.my_Profile}`}>
        <LearnerUserProfile />
      </div>
    </>
  );
};

export default MyProfile;
