import styles from './cohortListCard.module.scss';

export default function CohortListCard({ data,isRoundImage = false, children, handleClick=()=>{} }) {
  return (
    <div className={`${styles.listCard}`} onClick={handleClick}>
      {/* course img */}
      <div className={isRoundImage ? `${styles.imgRoundContainer}`:`${styles.imgContainer}`}>
        <img src={data?.tileImg || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        {/* <p className={`${styles.title}`}>{cohortData?.title || 'Start with Project Management'}</p> */}
        <p className={`${styles.title}`}>{data?.name}</p>

        {/* <p className={`${styles.desc}`}>{cohortData?.description}</p> */}
        <p className={`${styles.desc}`}>{data?.description}</p>
        {data?.designation && <p className={`${styles.designation}`}>{data?.designation}</p>}
      </div>

      <div className={`${styles.footer}`}>{children}</div>
    </div>
  );
}
