import { getCourseDisplayTime } from '@/helper/utils.helper';
import styles from './courseBoxCard.module.scss';

export default function CalenderFooter({ courseData }) {
  return (
    <div className={`${styles.calenderFooter}`}>
      <div>
        <p style={{ marginBottom: '5px' }}>
          Duration: {getCourseDisplayTime(courseData?.duration * 60)}
        </p>
        <p>
          Expected Completion by <br /> {courseData?.expected_completion || '22-06-2022'}
        </p>
      </div>

      <img src="/images/svg/calendar-month.svg" alt="" className={`${styles.imgIcon}`} />
    </div>
  );
}
