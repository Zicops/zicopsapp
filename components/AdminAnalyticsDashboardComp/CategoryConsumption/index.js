import styles from '../adminAnalyticsDashboard.module.scss';
import BarGraph from '@/components/DashboardComponents/BarGraph';
import { CategoryConsumptionData } from '@/components/DashboardComponents/Logic/dashboardData.helper';

export default function CategoryConsumption() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Category consumption</div>
      <div className={`${styles.wrapperSubHeading}`}>All categories</div>
      <BarGraph categoryConsumptionData={CategoryConsumptionData} />
    </div>
  );
}
