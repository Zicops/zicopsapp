import ItemSlider from '@/components/common/ItemSlider';
import UserProgressCard from '../UserProgressCard';
import styles from '../userLearningDashboardTab.module.scss';
import SmallCard from '../SmallCard';
import { CohortsData } from '../userLearningDashboardTab.helper.js';

const CohortDashboardCardSlider = () => {
  // const dataArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  console.log(CohortsData);
  return (
    <div style={{ position: 'relative' }}>
      <div className={`${styles.headingText}`} style={{ borderBottom: '1px solid white' }}>
        Your Cohorts
      </div>
      <ItemSlider responsiveViews={[4, 4, 1]}>
        {CohortsData.map(function (v, i) {
          return <SmallCard CohortsData={v} />;
        })}
      </ItemSlider>
    </div>
  );
};

export default CohortDashboardCardSlider;
