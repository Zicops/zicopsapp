import styles from './cohortListCard.module.scss';

export default function CohortListCard({ cohortData, children }) {
  return (
    <div className={`${styles.listCard}`}>
      {/* course img */}
      <div className={`${styles.imgContainer}`}>
        <img src={cohortData?.tileImg || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        <p className={`${styles.title}`}>{cohortData?.title || 'Start with Project Management'}</p>

        <p className={`${styles.desc}`}>{cohortData?.description}</p>
      </div>

      <div className={`${styles.footer}`}>{children}</div>
    </div>
  );
}
