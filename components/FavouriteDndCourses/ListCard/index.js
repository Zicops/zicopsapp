import DurationFooter from './DurationFooter';
import ProgressBarFooter from './ProgressBarFooter';
import styles from './listCard.module.scss';
import { truncateToN } from '@/helper/common.helper';
import { useRouter } from 'next/router';

export default function ListCard({ courseData, statusData, footerType, children }) {
  const router = useRouter();

  return (
    <div
      className={`${styles.cardContainer}`}
      onClick={() => router.push(`/course/${courseData?.id}`)}>
      {/* course img */}
      <div className={`${styles.imgContainer}`}>
        <img src={courseData?.tileImage || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        <div className={`${styles.head}`}>
          {/* title and cat subcat */}
          <section>
            <p className={`${styles.title}`}>{truncateToN(courseData?.name, 60) || ''}</p>

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
