import { getDateTimeFromUnix } from '@/components/Tabs/Logic/tabs.helper';
import moment from 'moment';
import styles from './courseListCard.module.scss';

export default function DurationFooter({ courseData, isAdded }) {
  const isUnix = !isNaN(+courseData?.created_at);

  //made changes but wasnt merge
  return (
    <div className={`${styles.durationFooter}`}>
      {isAdded ? (
        <p>
          Added on{' '}

          {(isUnix
            ? moment(getDateTimeFromUnix(courseData?.created_at)).format('DD-MM-YYYY')
            : courseData?.created_at) || '22-06-2022'}

        </p>
      ) : (
        <p>Expected Completion by {courseData?.expected_completion || '22-06-2022'}</p>
      )}
      <p>Duration: {courseData?.duration || 40} hours of content</p>
    </div>
  );
}
