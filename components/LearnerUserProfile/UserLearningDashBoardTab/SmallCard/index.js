import styles from '../userLearningDashboardTab.module.scss';

const SmallCard = () => {
  return (
    <div className={`${styles.smallCard}`}>
      <div className={`${styles.cardImg}`}>
        <img src="images/image.png" />
      </div>
      <div className={`${styles.cardInfo}`}>
        <div className={`${styles.cardText}`}>JAVA Refresher</div>
        <div className={`${styles.cardIn}`}>
          <div className={`${styles.cardInfoImg}`}>
            <img src='images/svg/workspace_premium.svg'/>
          </div>

          <div className={`${styles.cardInfoNumber}`}>17</div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
