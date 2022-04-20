import McqCheckBox from '../McqCheckBox';
import styles from './mcqOption.module.scss';

const McqOption = ({ obj }) => {
  const opt =
    obj.src === undefined ? (
      <b>
        {obj.text}
        <McqCheckBox />
      </b>
    ) : (
      <>
        <img src={`${obj.src}`} alt="Not found" />
        <McqCheckBox />
      </>
    );

  return (
    <>
      <div className={`${styles.options}`}>
        <div>{`${obj.option}.  `} </div>
        <div className={`${styles.option}`}>{opt}</div>
      </div>
    </>
  );
};

export default McqOption;
