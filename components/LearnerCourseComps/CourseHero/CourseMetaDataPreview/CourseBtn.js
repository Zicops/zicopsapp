import { PlayBtnIcon } from '@/common/ZicopsIcons';
import { displayDateFromUnix } from '@/utils/date.utils';
import PropTypes from 'prop-types';
import ZicopsButton from '../../common/ZicopsButton';
import styles from '../../learnerCourseComps.module.scss';

export default function CourseBtn({
  suggestedDurationInDays = null,
  completionDateUnix,
  isAssigned,
  completedPercent = null
}) {
  const btnText = (
    <span className={`${styles.courseBtn}`}>
      <span className={`${styles.progress} w-${completedPercent}`}></span>
      <span className={`${styles.playBtnImgContainer}`}>
        <PlayBtnIcon color={styles.primary} />
      </span>
      Start the Course
    </span>
  );

  return (
    <div className={`${styles.courseBtnContainer}`}>
      <span>
        <ZicopsButton
          display={btnText}
          handleClick={() => {}}
          padding="0.5em 5em"
          fontSize="1em"
          fontWeight="bold"
        />
        {completedPercent !== null && (
          <p>
            <span>{completedPercent}%</span>
            Completed
          </p>
        )}
      </span>

      <div className={`${styles.courseEndData}`}>
        {!!suggestedDurationInDays && (
          <p className={`${styles.textGray}`}>
            **Suggested duration for completion of this course is {suggestedDurationInDays} day
            {suggestedDurationInDays > 1 ? 's' : ''}
          </p>
        )}
        {!!isAssigned && (
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
  completionDateUnix: null
};

CourseBtn.propTypes = {
  suggestedDurationInSeconds: PropTypes.number,

  isAssigned: PropTypes.bool,
  completionDateUnix: PropTypes.number
};
