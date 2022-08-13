import DataCard from './DataCard';
import ItemSlider from '@/components/common/ItemSlider';
import { UserDashboardCardSliderData } from '../userLearningDashboardTab.helper.js';
import DayWeekMonth from '@/components/common/DayWeekMonth';
const UserDashboardCardSlider = () => {
  // const dataArr = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DayWeekMonth />
      </div>
      <hr />
      <div style={{ position: 'relative' }}>
        <ItemSlider
          responsiveViews={[4, 4, 1]}
          carouselProps={{ containerClass: 'itsItemContainer' }}>
          {UserDashboardCardSliderData.map(function (v, i) {
            return <DataCard UserDashboardCardSliderData={v} />;
          })}
        </ItemSlider>
      </div>
    </div>
  );
};

export default UserDashboardCardSlider;
