import styles from '../dashboardComponents.module.scss';

export default function Card({cardTitle ='', cardImage='', cardCount='', cardText=''}) {
  return (
    <div className={`${styles.card_wrapper}`}>
      <div className={`${styles.card_head}`}>
        <div className={`${styles.card_title}`}>{cardTitle}</div>
        <div className={`${styles.card_img}`}>
          <img src={cardImage} alt={cardTitle} />
        </div>
      </div>
      <div className={`${styles.card_count}`}>{cardCount || 'X'}</div>
      <div className={`${styles.card_text}`}>{cardText || '23 assigned courses'}</div>
    </div>
  );
}

