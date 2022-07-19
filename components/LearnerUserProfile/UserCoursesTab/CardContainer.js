import AssignedCourses from '@/components/UserProfile/AssignedCourses';
import GridCourseCards from '@/components/UserProfile/GridCourseCards';
import { useState } from 'react';
import styles from '../learnerUserProfile.module.scss';

export default function CardContainer({ type, courseData }) {
  const [isBoxView, setIsBoxView] = useState(true);

  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`${styles.courseTabHeader}`}>
        <p>{type}</p>

        <div className={`${styles.imageContainer}`}>
          <img
            src={`/images/svg/view_agenda${isBoxView ? '_gray' : ''}.svg`}
            onClick={() => setIsBoxView(false)}
          />
          <img
            src={`/images/svg/grid_view${isBoxView ? '_primary' : ''}.svg`}
            onClick={() => setIsBoxView(true)}
          />

          <button className={`${styles.seeAllBtn}`}>
            See All
            <img src={`/images/arrow2.png`} onClick={() => setIsBoxView(true)} />
          </button>
        </div>
      </div>

      <hr />

      {isBoxView ? (
        // <GridCourseCards courses={course} isRemoveable={false} />
        <div>
          {courseData?.map((course) => (
            <AssignedCourses isLearner={true} />
          ))}
        </div>
      ) : (
        <>
          {courseData?.map((course) => (
            <AssignedCourses isLearner={true} />
          ))}
        </>
      )}
    </div>
  );
}
