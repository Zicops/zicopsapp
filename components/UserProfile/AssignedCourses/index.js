import RangeSlider from '../../common/FormComponents/RangeSlider';
import LinearProgressWithLabel from '../LinearProgressWithLabel';
import styles from './assignedCourses.module.scss';
const AssignedCourses = ({ isLearner }) => {
  return (
    <>
      <div className={`${styles.assigned_courses}`}>
        <div className={`${styles.media_img}`}>
          <img src="/images/media.png" alt="Not Found" width={130} />
        </div>
        <div className={`${styles.assignedCourseInfo}`}>
          <div className={`${styles.course}`}>
            <div className={`${styles.course_name}`}>Core Java Resfresher</div>
            <div className={`${styles.selfDiv}`}>
              <div className={`${styles.self}`}>Self paced</div>
              {!isRemoveable && (
                <div>
                  <img src="/images/svg/close.svg/" width={20} />
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.course_catAndSubCat}`}>
            <div className={`${styles.cat}`}>Development</div>
            <div className={`${styles.cat}`}>JAVA</div>
          </div>
          <div className={`${styles.course}`}>
            <div className={`${styles.text_only}`}>Mandatory</div>
            <div className={`${styles.text_only}`}>
              {isLearner ? '' : 'Expected Completion by 22-06-2022'}
            </div>
          </div>
          <div className={`${styles.slider}`}>
            <LinearProgressWithLabel value={10} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedCourses;
