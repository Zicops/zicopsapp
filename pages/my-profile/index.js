import AttempHistory from '@/components/AttemptHistory';
import LearnerUserProfile from '../../components/LearnerUserProfile';
import styles from './myProfile.module.scss';

const MyProfile = () => {
  return (
    <>
      <div className={`${styles.my_Profile}`}>
        <LearnerUserProfile />
        {/* <AttempHistory /> */}
      </div>
    </>
  );
};

export default MyProfile;
