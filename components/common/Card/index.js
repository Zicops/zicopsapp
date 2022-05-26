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
            <div className={`${styles.coursename}`}> Hands on Scripting with PYTHON </div>
            <div className={`${styles.courseowner}`}> Scripting </div>
        </div>
        <img src={ data.img  || "/images/dnd1.jpg" } alt="" />
      </div>
    </>
  );
}
