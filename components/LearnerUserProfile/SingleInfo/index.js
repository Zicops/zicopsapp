import styles from '../learnerUserProfile.module.scss';

const SingleInfo = ({ userData }) => {
  return (
    <div className={`${styles.singleWraper}`}>
      <div className={`${styles.singleImage}`}>
        <img src={userData.image} />
      </div>
      <div className={`${styles.textWraper}`}>
        <div className={`${styles.smallText}`}>{userData.text}:</div>
        <div className={`${styles.largeText}`}>{userData.info} </div>
      </div>
    </div>
  );
};

export default SingleInfo;
