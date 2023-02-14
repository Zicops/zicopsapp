import styles from '../dashboardComponents.module.scss';
import Pill from '../Pill';
import ProgressBar from '../ProgressBar';

export default function AvailabilityCard({
  language = '',
  totalLangCourses = null,
  progressPercent = 0
}) {
  const courseCount = totalLangCourses == null ? 'X' : totalLangCourses;

  return (
    <div className={`${styles.availabilityCard}`}>
      <div className={`${styles.availabilityCardFirst}`}>
        <div className={`${styles.imgText}`}>
          <img src="/images/svg/translate.svg" />
          <p className={`${styles.language}`}>{language}</p>
        </div>
        <Pill displayText={`${courseCount} courses`} />
      </div>

      <div className={`${styles.availabilityCardSecond}`}>
        <div className={`${styles.card_count}`}>{progressPercent}%</div>
        <div className={`${styles.card_text}`}>Availability</div>
      </div>

      <ProgressBar progressPercent={progressPercent} />
    </div>
  );
}
