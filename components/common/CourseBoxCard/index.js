import CalenderFooter from './CalenderFooter';
import styles from './courseListCard.module.scss';

export default function CourseBoxCard({ courseData, footerType = 'calenderFooter', children }) {
  return (
    <div className={`${styles.cardContainer}`}>
      <div className={`${styles.imgContainer}`}>
        <img src={courseData?.tileImg || '/images/profile-card.png'} alt="" />

        <div className={`${styles.dataOverImg}`}>
          <span>
            <img src="/images/media.png" alt="" className={`${styles.imgIcon}`} />
            {courseData?.level || 'Competent'}
          </span>

          <span className={`${styles.type}`}>{courseData?.type || 'Self Paced'}</span>
        </div>
      </div>

      <div className={`${styles.cardBody}`}>
        <p className={`${styles.title}`}>{courseData?.title || 'Start with Project Management'}</p>

        <p className={`${styles.catSubCat}`}>
          {courseData?.category || 'Development'} {courseData?.subCategory || 'Java'}
        </p>
      </div>

      {/* footer */}
      <div>
        {footerType === 'calenderFooter' && <CalenderFooter courseData={courseData} />}
        {children}
        {/* 
        <div className={`${styles.courseCompletedFooter}`}>
          <div>
            <p>Duration: {courseData?.duration || 240} mins</p>
            <p>Expected Completion by {courseData?.expectedCompletion || '22-06-2022'}</p>
          </div>

          <img src="/images/svg/calendar-month.svg" alt="" className={`${styles.imgIcon}`} />
        </div> */}
      </div>
    </div>
  );
}
