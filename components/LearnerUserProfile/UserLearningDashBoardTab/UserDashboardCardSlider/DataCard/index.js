// import { AssignmentTurnedIn } from '@/components/Icons';
import styles from '../../userLearningDashboardTab.module.scss';

const DataCard = ({ UserDashboardCardSliderData }) => {
  return (
    <div className={`${styles.smallCard}`}>
      <div className={`${styles.cardImg}`}>
        <img
          src={UserDashboardCardSliderData.image}
          style={{ backgroundColor: '#292F2F', borderRadius: '50%', padding: '20px' }}
        />
      </div>
      <div className={`${styles.cardInfo}`}>
        <div className={`${styles.cardText}`}>{UserDashboardCardSliderData.text}</div>
        <div className={`${styles.cardIn}`}>
          <div className={`${styles.cardInfoNumber}`}>{UserDashboardCardSliderData.number}</div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
