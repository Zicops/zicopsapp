import { getCourseDisplayTime } from '@/helper/utils.helper';
import moment from 'moment';
import styles from './listCard.module.scss';

export default function DurationFooter({ courseData, isAdded }) {
  //made changes but wasnt merge
  return (
    <div className={`${styles.durationFooter}`}>
      {isAdded ? (
        <p>Added on {moment.unix(courseData?.created_at).format('DD/MM/YYYY') || ''}</p>
      ) : (
        <p>Expected Completion by {courseData?.expected_completion || '22-06-2022'}</p>
      )}
      <p>Duration: {getCourseDisplayTime(courseData?.duration)} of content</p>
    </div>
  );
}
