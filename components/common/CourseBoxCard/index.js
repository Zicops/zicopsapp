import CalenderFooter from './CalenderFooter';
import styles from './courseBoxCard.module.scss';
import ProgressBarFooter from './ProgressBarFooter';

export default function CourseBoxCard({ courseData, footerType, cardWidth = 300, children }) {
  return (
    <div className={`${styles.cardContainer}`} style={{ width: `${cardWidth}px` }}>
      <div className={`${styles.imgContainer}`}>
        {/* course img */}
        <img src={courseData?.tileImg || '/images/profile-card.png'} alt="" />

        {/* level and type */}
        <div className={`${styles.dataOverImg}`}>
          <span>
            <img src="/images/media.png" alt="" className={`${styles.imgIcon}`} />
            {courseData?.level || 'Competent'}
          </span>

          <span className={`${styles.type}`}>{courseData?.type || 'Self Paced'}</span>
        </div>
      </div>

      {/* title and cat sub cat */}
      <div className={`${styles.cardBody}`}>
        <p className={`${styles.title}`}>{courseData?.title || 'Start with Project Management'}</p>

        <p className={`${styles.catSubCat}`}>
          {courseData?.category || 'Development'} {courseData?.subCategory || 'Java'}
        </p>
      </div>

      {/* footer */}
      <div>
        {footerType === 'assigned' && <CalenderFooter courseData={courseData} />}
        {['onGoing', 'completed'].includes(footerType) && (
          <ProgressBarFooter courseData={courseData} isCompleted={footerType === 'completed'} />
        )}

        {children}
      </div>
    </div>
  );
}
