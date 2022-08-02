import Charts from '@/components/common/Charts';
// import CardSliderBody from './CardSliderBody';
import styles from '../learnerUserProfile.module.scss';
import UserProgressSlider from './UserProgressSlider';
import CohortDashboardCardSlider from './CohortDashboardCardSlider';
import UserMostEngagedSubcategories from './UserMostEngagedSubcategories';

const UserLearningDashboardTab = () => {
  return (
    <div className={`${styles.userTabContainer}`}>
      {/* bar graph view */}
      {/* user dashboard card slider */}
      {/* user dashboard learning target */}
      {/* line chart view */}
      {/* cohort dashboard card slider */}
      {/* user most engaged subcategories */}
      {/* user progress slider */}
      {/* <Charts /> */}
      {/* <CardSliderBody /> */}
      <UserProgressSlider />
      <CohortDashboardCardSlider />
      <UserMostEngagedSubcategories />
    </div>
  );
};

export default UserLearningDashboardTab;
