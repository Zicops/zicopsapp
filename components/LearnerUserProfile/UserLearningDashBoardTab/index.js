import Charts from '@/components/common/Charts';
// import CardSliderBody from './CardSliderBody';
import styles from '../learnerUserProfile.module.scss';
import UserProgressSlider from './UserProgressSlider';
import CohortDashboardCardSlider from './CohortDashboardCardSlider';
import UserMostEngagedSubcategories from './UserMostEngagedSubcategories';
import UserDashboardCardSlider from './UserDashboardCardSlider';
import BarGraphView from './BarGraphView';
import LineChartView from './LineChartView';
import VennDiagram from '@/components/DashboardComponents/VennDiagram';
import { data } from '@/components/DashboardComponents/Logic/dashboardData.helper';
import { useEffect } from 'react';

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
      {/* <CardSliderBody /> */}
      {/* <Charts /> */}
      <BarGraphView />
      {/* <VennDiagram data={data} />/ */}
      <UserDashboardCardSlider />
      <LineChartView/>
      <CohortDashboardCardSlider />
      <UserMostEngagedSubcategories />
      <UserProgressSlider />
    </div>
  );
};

export default UserLearningDashboardTab;
