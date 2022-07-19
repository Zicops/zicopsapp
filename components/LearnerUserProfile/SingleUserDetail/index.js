import styles from '../learnerUserProfile.module.scss';
import UserInfoWraper from '../UserInfoWraper';

const SingleUserDetail = ({ headingText, userData, toggleEditable, isEditable }) => {
  return (
    <>
      <div className={`${styles.textEditIcon}`}>
        <div className={`${styles.text}`}>{headingText}</div>
        <div className={`${styles.Icon}`} onClick={toggleEditable}>
          <img src="/images/svg/edit.svg" />
        </div>
      </div>
      <hr />
      <UserInfoWraper userData={userData} toggleEditable={toggleEditable} isEditable={isEditable} />
    </>
  );
};

export default SingleUserDetail;
