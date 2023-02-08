import AvailabilityCard from '@/components/DashboardComponents/AvailabilityCard';
import styles from '../adminAnalyticsDashboard.module.scss';
import useHandleMultilingualCourses from '../Logic/useHandleMultilingualCourses';

export default function MultilingualCourseAvailability() {
  const cardData = useHandleMultilingualCourses();

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Multilingual course availability</div>

      {cardData.map((data) => {
        return <AvailabilityCard key={data?.id} {...data} />;
      })}
    </div>
  );
}
