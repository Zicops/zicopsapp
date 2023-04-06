import styles from '../vctoolMain.module.scss';
const StudentFrame = ({ name, avatarUrl = '' }) => {
  return (
    <div className={`${styles.studentFrame}`}>
      {!avatarUrl ? (
        <div className={`${styles.avtar}`}>{name?.substring(0, 2)}</div>
      ) : (
        <div className={`${styles.profilePic}`}>
          <img src={avatarUrl} />
        </div>
      )}
      <div className={styles.studentFramename}>{name}</div>
      <div className={`${styles.studentFrameicons}`}>
        <img src="/images/svg/vctool/back-hand.svg" />
        <img src="/images/svg/vctool/mic-off.svg" />
        <img src="/images/svg/vctool/videocam-off.svg" />
      </div>
    </div>
  );
};
export default StudentFrame;
