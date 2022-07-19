import styles from './courseListCard.module.scss';

export default function CalenderFooter({ courseData }) {
  return (
    <div className={`${styles.calenderFooter}`}>
      <div>
        <p>Duration: {courseData?.duration || 240} mins</p>
        <p>Expected Completion by {courseData?.expectedCompletion || '22-06-2022'}</p>
      </div>

      <img src="/images/svg/calendar-month.svg" alt="" className={`${styles.imgIcon}`} />
    </div>
  );
}
