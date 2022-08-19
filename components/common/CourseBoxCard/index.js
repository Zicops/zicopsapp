import CalenderFooter from './CalenderFooter';
import styles from './courseBoxCard.module.scss';
import ProgressBarFooter from './ProgressBarFooter';

export default function CourseBoxCard({
  isAdmin = false,
  courseData,
  footerType,
  cardWidth = 300,
  children
}) {
  return (
    <div
      className={`${styles.cardContainer} ${isAdmin ? styles.isAdmin : ''}`}
      style={{ width: `${cardWidth}px` }}>
      <div className={`${styles.imgContainer}`}>
        {/* course img */}
        <img src={courseData?.tileImage || '/images/profile-card.png'} alt="" />

        {/* level and type */}
        <div className={`${styles.dataOverImg}`}>
          {!isAdmin && (
            <span>
              <img src="/images/Media.png" alt="" className={`${styles.imgIcon}`} />
              {courseData?.level || 'Competent'}
            </span>
          )}
          <span className={`${styles.type}`}>{courseData?.type || 'Self Paced'}</span>
        </div>
      </div>

      {/* title and cat sub cat */}
      <div className={`${styles.cardBody}`}>
        <div>
          <p className={`${styles.title}`}>{courseData?.name || 'Start with Project Management'}</p>
          <p className={`${styles.catSubCat}`}>
            {courseData?.category || 'Development'}
            <div className={`${styles.dot}`}></div> {courseData?.sub_category || 'Java'}
          </p>
        </div>

        {/* {isAdmin && (
          <svg
            width="25"
            height="27"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 12C8.71667 12 8.47933 11.904 8.288 11.712C8.096 11.5207 8 11.2833 8 11C8 10.7167 8.096 10.479 8.288 10.287C8.47933 10.0957 8.71667 10 9 10C9.28333 10 9.521 10.0957 9.713 10.287C9.90433 10.479 10 10.7167 10 11C10 11.2833 9.90433 11.5207 9.713 11.712C9.521 11.904 9.28333 12 9 12ZM5 12C4.71667 12 4.479 11.904 4.287 11.712C4.09567 11.5207 4 11.2833 4 11C4 10.7167 4.09567 10.479 4.287 10.287C4.479 10.0957 4.71667 10 5 10C5.28333 10 5.521 10.0957 5.713 10.287C5.90433 10.479 6 10.7167 6 11C6 11.2833 5.90433 11.5207 5.713 11.712C5.521 11.904 5.28333 12 5 12ZM13 12C12.7167 12 12.4793 11.904 12.288 11.712C12.096 11.5207 12 11.2833 12 11C12 10.7167 12.096 10.479 12.288 10.287C12.4793 10.0957 12.7167 10 13 10C13.2833 10 13.5207 10.0957 13.712 10.287C13.904 10.479 14 10.7167 14 11C14 11.2833 13.904 11.5207 13.712 11.712C13.5207 11.904 13.2833 12 13 12ZM9 16C8.71667 16 8.47933 15.904 8.288 15.712C8.096 15.5207 8 15.2833 8 15C8 14.7167 8.096 14.4793 8.288 14.288C8.47933 14.096 8.71667 14 9 14C9.28333 14 9.521 14.096 9.713 14.288C9.90433 14.4793 10 14.7167 10 15C10 15.2833 9.90433 15.5207 9.713 15.712C9.521 15.904 9.28333 16 9 16ZM5 16C4.71667 16 4.479 15.904 4.287 15.712C4.09567 15.5207 4 15.2833 4 15C4 14.7167 4.09567 14.4793 4.287 14.288C4.479 14.096 4.71667 14 5 14C5.28333 14 5.521 14.096 5.713 14.288C5.90433 14.4793 6 14.7167 6 15C6 15.2833 5.90433 15.5207 5.713 15.712C5.521 15.904 5.28333 16 5 16ZM13 16C12.7167 16 12.4793 15.904 12.288 15.712C12.096 15.5207 12 15.2833 12 15C12 14.7167 12.096 14.4793 12.288 14.288C12.4793 14.096 12.7167 14 13 14C13.2833 14 13.5207 14.096 13.712 14.288C13.904 14.4793 14 14.7167 14 15C14 15.2833 13.904 15.5207 13.712 15.712C13.5207 15.904 13.2833 16 13 16ZM2 20C1.45 20 0.979 19.8043 0.587 19.413C0.195667 19.021 0 18.55 0 18V4C0 3.45 0.195667 2.97933 0.587 2.588C0.979 2.196 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.021 2.196 17.413 2.588C17.8043 2.97933 18 3.45 18 4V18C18 18.55 17.8043 19.021 17.413 19.413C17.021 19.8043 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z"
              fill="#6BCFCF"
            />
          </svg>
        )} */}
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
