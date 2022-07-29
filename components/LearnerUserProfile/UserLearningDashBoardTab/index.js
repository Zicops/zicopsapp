import Charts from '@/components/common/Charts';
import styles from '../learnerUserProfile.module.scss';

const UserLearningDashboardTab = () => {
  return (
    <div className={`${styles.userTabContainer}`}>
      <Charts />
    </div>
  );
};

export default UserLearningDashboardTab;
