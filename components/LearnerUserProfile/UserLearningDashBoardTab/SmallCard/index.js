import styles from '../userLearningDashboardTab.module.scss';
// import { CohortsData } from '../userLearningDashboardTab.helper.js';

const SmallCard = ({ CohortsData }) => {
  return (
    <div className={`${styles.smallCard}`}>
      <div className={`${styles.cardImg}`}>
        <img src={CohortsData.imageData} />
      </div>
      <div className={`${styles.cardInfo}`}>
        <div className={`${styles.cardText}`}>{CohortsData.text1}</div>
        <div className={`${styles.cardIn}`}>
          <div className={`${styles.cardInfoImg}`}>
            <img src="images/svg/workspace_premium.svg" />
          </div>

          <div className={`${styles.cardInfoNumber}`}>{CohortsData.number1}</div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
