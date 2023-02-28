import AvailabilityCard from '@/components/DashboardComponents/AvailabilityCard';
import styles from '../adminAnalyticsDashboard.module.scss';
import SectionTitle from '../common/SectionTitle';
import useHandleMultilingualCourses from '../Logic/useHandleMultilingualCourses';

export default function MultilingualCourseAvailability() {
  const cardData = useHandleMultilingualCourses();

  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle title="Multilingual course availability" />

      {cardData.map((data) => {
        return <AvailabilityCard key={data?.id} {...data} />;
      })}
    </div>
  );
}
