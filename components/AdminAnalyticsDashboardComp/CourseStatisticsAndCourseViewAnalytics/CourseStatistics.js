import StatisticsCard from '@/components/DashboardComponents/StatisticsCard';
import styles from '../adminAnalyticsDashboard.module.scss';
import SectionTitle from '../common/SectionTitle';
import useHandleCourseStatistics from '../Logic/useHandleCourseStatistics';

export default function CourseStatistics() {
  const { mostAssigned, leastAssigned } = useHandleCourseStatistics();

  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle title="Course Statistics" />

      {[mostAssigned, leastAssigned].map((data) => {
        return <StatisticsCard key={data?.id} {...data} />;
      })}
    </div>
  );
}
