import ItemSlider from '@/components/common/ItemSlider';
import UserProgressCard from '../UserProgressCard';

const UserProgressSlider = () => {
  const dataArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  return (
    <div style={{ position: 'relative' }}>
      <ItemSlider>
        {dataArr.map(function (v, i) {
          return <UserProgressCard data={v} />;
        })}
      </ItemSlider>
    </div>
  );
};

export default UserProgressSlider;
