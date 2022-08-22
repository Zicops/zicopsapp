import styles from './cohortManagerList.module.scss';
const CohortManagerList = () => {
    return (
      <div className={`${styles.cohortManagerList}`}>
        <div className={`${styles.cohortManagerImg}`}>
          <img src="./images/memberImg.png" />
        </div>
        <div className={`${styles.cohortManagerData}`}>
          <p> Denansh Mishra</p>
          <p className={`${styles.designation}`}>Cohor Maneger</p>
        </div>
      </div>
    );
}
 
export default CohortManagerList;