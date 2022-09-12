import styles from './congratulationsHead.module.scss';

const CongratulationsHead = ({ exam_name, user_name, data, style }) => {
  return (
    <>
      <div
        className={`${styles.Congratulations_Head}`}
        // style={{ width: style.width }}
      >
        <div className={`${styles.congratulations_img}`}>
          <img src={`${style.imgLink}`} width={200} />
        </div>
        <div className={`${styles.congratulations_text}`}>
          <h1 className={`${styles.title}`}>
            <span style={{ color: style.color }}>{data.text}</span> {user_name} !
          </h1>
          <h2 style={{ fontWeight: '200' }}>{data.message}</h2>
          <h3 style={{ fontWeight: '200', paddingTop: '20px' }}>{exam_name}</h3>
        </div>
      </div>
    </>
  );
};

export default CongratulationsHead;
