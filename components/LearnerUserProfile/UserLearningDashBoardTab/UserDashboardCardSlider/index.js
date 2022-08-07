import DataCard from './DataCard';
import ItemSlider from '@/components/common/ItemSlider';
import { UserDashboardCardSliderData } from '../userLearningDashboardTab.helper.js';
import DayWeekMonth from '@/components/common/DayWeekMonth';
const UserDashboardCardSlider = () => {
  // const dataArr = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 15px',borderBottom:'1px solid white',paddingBottom:'10px'}}>
        <DayWeekMonth />
      </div>
      <ItemSlider responsiveViews={[4, 4, 1]}>
        {UserDashboardCardSliderData.map(function (v, i) {
          return <DataCard UserDashboardCardSliderData={v} />;
        })}
      </ItemSlider>
    </div>
  );
};

export default UserDashboardCardSlider;
