import { statisticsCardData } from '@/components/DashboardComponents/Logic/dashboardData.helper';
import StatisticsCard from '@/components/DashboardComponents/StatisticsCard';
import styles from '../adminAnalyticsDashboard.module.scss';
import SectionTitle from '../common/SectionTitle';

export default function CourseStatistics() {
  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle title="Course statistics" />

      {statisticsCardData.map((data) => {
        return <StatisticsCard key={data?.id} {...data} />;
      })}
    </div>
  );
}
