import { getDateTimeFromUnix } from '@/components/Tabs/Logic/tabs.helper';
import moment from 'moment';
import styles from './listCard.module.scss';

export default function DurationFooter({ courseData, isAdded }) {
  //made changes but wasnt merge
  return (
    <div className={`${styles.durationFooter}`}>
      {isAdded ? (
        <p>
          Added on{' '}
          {moment(getDateTimeFromUnix(courseData?.created_at)).format('DD-MM-YYYY') || '22-06-2022'}
        </p>
      ) : (
        <p>Expected Completion by {courseData?.expected_completion || '22-06-2022'}</p>
      )}
      <p>Duration: {courseData?.duration || 40} hours of content</p>
    </div>
  );
}
