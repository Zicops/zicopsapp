import styles from './courseListCard.module.scss';

export default function DurationFooter({ courseData, isAdded }) {
  return (
    <div className={`${styles.durationFooter}`}>
      {isAdded ? (
        <p>Added on {courseData?.addedOn || '22-06-2022'}</p>
      ) : (
        <p>Expected Completion by {courseData?.expectedCompletion || '22-06-2022'}</p>
      )}
      <p>Duration: {courseData?.duration || 40} hours of content</p>
    </div>
  );
}
