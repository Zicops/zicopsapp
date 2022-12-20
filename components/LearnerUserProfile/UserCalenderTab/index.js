import CohortListCard from '@/components/common/CohortListCard';
import styles from '../learnerUserProfile.module.scss';

const UserCalenderTab = () => {
  return <div className={`${styles.userTabContainer}`}>
    <CohortListCard isSchedule={true} />
  </div>;
};

export default UserCalenderTab;
