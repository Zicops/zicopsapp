import ItemSlider from '@/components/common/ItemSlider';
import UserProgressCard from '../UserProgressCard';
import styles from '../userLearningDashboardTab.module.scss';
import SmallCard from '../SmallCard';

const CohortDashboardCardSlider = () => {
  const dataArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  return (
    <div style={{ position: 'relative' }}>
      <ItemSlider responsiveViews={[4, 4, 1]}>
        {dataArr.map(function (v, i) {
          return <SmallCard data={v} />;
        })}
      </ItemSlider>
    </div>
  );
};

export default CohortDashboardCardSlider;
