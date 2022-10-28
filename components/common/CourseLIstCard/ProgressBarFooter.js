import { getDateTimeFromUnix } from '@/components/Tabs/Logic/tabs.helper';
import moment from 'moment';
import styles from './courseListCard.module.scss';

export default function ProgressBarFooter({ courseData, isCompleted }) {

  
  return (
    <div className={`${styles.progressBarFooter}`}>
      <section>
        {isCompleted ? (
          <>
            <p>Completed on {moment.unix(courseData?.updated_at).format("DD/MM/YYYY") || '22-06-2022'}</p>
          </>
        ) : (
          <>
            <p>
              Expected Completion by {courseData?.expected_completion || '22-06-2022'}
              <div className={`${styles.dot}`}></div>
              <span className={`${styles.mandatory}`}>
                {courseData?.is_mandatory ? 'Mandatory' : 'Not Mandatory'}
              </span>
            </p>
            <p className={styles.percent}>{isNaN(+courseData?.timeLeft)? 0.00 : courseData?.timeLeft} hours of content left</p>
          </>
        )}
      </section>

      <section className={styles.progress}>
        <span className={`w-${courseData?.completedPercentage || 90}`}></span>
      </section>
    </div>
  );
}
