import Dropdown from '@/components/DashboardComponents/Dropdown';
import SwitchButton from '@/components/DashboardComponents/SwitchButton'
import styles from '../adminAnalyticsDashboard.module.scss';

export default function CategoryAvailability() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Category availability</div>
      <div className={`${styles.wrapperSubHeading}`}>
        Showing data for:
        <SwitchButton text={'Sub-categories'} isTextLeft={true} />
        {/* <Dropdown /> */}
      </div>
    </div>
  );
}
