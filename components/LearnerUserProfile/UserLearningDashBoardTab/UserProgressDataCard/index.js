import styles from '../userLearningDashboardTab.module.scss';
const UserProgressDataCard = () => {
    return (
      <div className={`${styles.userProgressDataCard}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.heading}`}>Design</div>
          <div className={`${styles.subheading}`}>UI/UX Design</div>
        </div>
        <div className={`${styles.right}`}>
          <div className={`${styles.datelabel}`}>Remaining</div>
          <div className={`${styles.datetime}`}>01/08/2022</div>
        </div>
      </div>
    );
}
 
export default UserProgressDataCard;