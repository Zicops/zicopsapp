import DayWeekMonth from '@/components/common/DayWeekMonth';
import { DownArrowIcon } from '@/components/Icons';
import styles from '../userLearningDashboardTab.module.scss';
import UserProgressDataCard from '../UserProgressDataCard';

const UserMostEngagedSubcategories = () => {
  return (
    <div className={`${styles.userMostEngagedSubcategories}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.head}`}>
          <div className={`${styles.headText}`}>Most Engaged Subcategories</div>
          <DayWeekMonth />
        </div>
        <div className={`${styles.allSubcategories}`}>
          <p>See all</p>

          <DownArrowIcon color={'#ffffff'} />
        </div>
      </div>
      <div className={`${styles.body}`}>
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
      </div>
    </div>
  );
};

export default UserMostEngagedSubcategories;
