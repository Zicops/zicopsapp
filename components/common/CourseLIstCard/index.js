import DurationFooter from './DurationFooter';
import ProgressBarFooter from './ProgressBarFooter';
import styles from './courseListCard.module.scss';

export default function CourseLIstCard({ courseData, statusData, footerType, children }) {
  return (
    <div className={`${styles.cardContainer}`}>
      {/* course img */}
      <div className={`${styles.imgContainer}`}>
        <img src={courseData?.tileImage || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        <div className={`${styles.head}`}>
          {/* title and cat subcat */}
          <section>
            <p className={`${styles.title}`}>
              {courseData?.name || 'Start with Project Management'}
            </p>

            <p className={`${styles.catSubCat}`}>
              {courseData?.category || 'Development'} <div className={`${styles.dot}`}></div>
              {courseData?.sub_category || 'Java'}
            </p>
          </section>

          {/* level and type */}
          <div className={`${styles.levelAndType}`}>
            <span>{courseData?.expertise_level || 'Competent'}</span>
            <span style={statusData ? { color: statusData?.color } : {}}>
              {statusData ? statusData?.status : courseData?.type || 'Self Paced'}
            </span>
          </div>
        </div>

        {/* footer */}
        <div className={`${styles.footer}`}>
          {['added', 'assigned'].includes(footerType) && (
            <DurationFooter courseData={courseData} isAdded={footerType === 'added'} />
          )}

          {['onGoing', 'completed'].includes(footerType) && (
            <ProgressBarFooter courseData={courseData} isCompleted={footerType === 'completed'} />
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
