import styles from '../learnerUserProfile.module.scss';
import UserInfoWraper from '../UserInfoWraper';

const SingleUserDetail = ({ headingText, userData }) => {
  return (
    <>
      <div className={`${styles.textEditIcon}`}>
        <div className={`${styles.text}`}>{headingText}</div>
        <div className={`${styles.Icon}`}>
          <img src="/images/svg/edit.svg" />
        </div>
      </div>
      <hr />
      <UserInfoWraper userData={userData} />
    </>
  );
};

export default SingleUserDetail;
