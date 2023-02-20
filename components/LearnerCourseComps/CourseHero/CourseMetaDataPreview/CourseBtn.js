import { PlayBtnIcon } from '@/common/ZicopsIcons';
import { displayDateFromUnix } from '@/utils/date.utils';
import PropTypes from 'prop-types';
import ZicopsButton from '../../common/ZicopsButton';
import ZicopsSkeleton from '../../common/ZicopsSkeleton';
import styles from '../../learnerCourseComps.module.scss';

export default function CourseBtn({
  suggestedDurationInDays = null,
  completionDateUnix = null,
  isAssigned = false,
  isStarted = false,
  isLoading = false,
  handleClick = () => {},
  completedPercent = null,
}) {
  function getBtnText() {
    if (isStarted) return 'Continue the Course';
    if (isAssigned) return 'Start the Course';

    return 'Preview the Course';
  }

  return (
    <div className={`${styles.courseBtnContainer}`}>
      <span>
        <ZicopsButton
          display={
            <span className={`${styles.courseBtn}`}>
              <span className={`${styles.progress} w-${completedPercent}`}></span>
              <span className={`${styles.playBtnImgContainer}`}>
                <PlayBtnIcon color={styles.primary} />
              </span>

              {getBtnText()}
            </span>
          }
          handleClick={handleClick}
          padding="0.5em 5em"
          fontSize="1em"
          fontWeight="bold"
          isLoading={isLoading}
        />
        {completedPercent !== null && (
          <p>
            <span>{completedPercent}%</span>
            Completed
          </p>
        )}
      </span>

      <div className={`${styles.courseEndData}`}>
        {!!isLoading && <ZicopsSkeleton variant="text" height={10} width={320} />}
        {!!suggestedDurationInDays && !isLoading && (
          <p className={`${styles.textGray}`}>
            **Suggested duration for completion of this course is {suggestedDurationInDays} day
            {suggestedDurationInDays > 1 ? 's' : ''}
          </p>
        )}

        {!!(isAssigned && completionDateUnix && !isLoading) && (
          <p className={`${styles.textGray}`}>
            Completion date of the assigned course is {displayDateFromUnix(completionDateUnix)}
          </p>
        )}
      </div>
    </div>
  );
}

CourseBtn.defaultProps = {
  suggestedDurationInSeconds: null,

  isAssigned: false,
  completionDateUnix: null,
};

CourseBtn.propTypes = {
  suggestedDurationInSeconds: PropTypes.number,

  isAssigned: PropTypes.bool,
  completionDateUnix: PropTypes.number,
};
