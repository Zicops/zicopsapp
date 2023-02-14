import InfoCountCard from '@/components/DashboardComponents/InfoCountCard';
import styles from '../adminAnalyticsDashboard.module.scss';
import SectionTitle from '../common/SectionTitle';
import useHandleMyCourseAvailability from '../Logic/useHandleMyCourseAvailability';

export default function MyCoursesAvailability() {
  const cardData = useHandleMyCourseAvailability();

  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle title="My courses availability" />

      <div className={`${styles.categoryAndExpertiseAvailability}`}>
        {cardData.map((data) => {
          return <InfoCountCard key={data?.id} {...data} />;
        })}
      </div>
    </div>
  );
}
