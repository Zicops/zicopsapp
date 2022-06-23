import styles from './card.module.scss';

export default function Card({ data, styleClass }) {
  const gotoPage = () => {
    alert('go go go!');
  };

  return (
    <>
      <div className={`${styles.zicopsCard} ${styleClass}`} onClick={gotoPage}>
        <div className={`${styles.cardOverlay}`}>
          <div className={`${styles.banner}`}>Self Paced</div>
          <div className={`${styles.coursename}`}> {data.name} </div>
          <div className={`${styles.courseowner}`}> {data.owner} </div>
        </div>
        <img src={data.image || '/images/dnd1.jpg'} alt="" />
      </div>
    </>
  );
}
