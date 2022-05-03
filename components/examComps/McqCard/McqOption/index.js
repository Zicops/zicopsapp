import McqCheckBox from '../McqCheckBox';
import styles from './mcqOption.module.scss';

const McqOption = ({ obj }) => {
  const checked = obj.checked === undefined ? false : true;
  console.log(checked);

  const opt =
    obj.src === undefined ? (
      <b>
        {obj.text}
        <McqCheckBox checked={checked} />
      </b>
    ) : (
      <div className={`${styles.img_container}`}>
        <img src={`${obj.src}`} alt="Not found" />
        <McqCheckBox checked={checked} />
      </div>
    );

  return (
    <>
      <div className={`${styles.options}`}>
        {`${obj.option}.  `}
        <div className={`${styles.option}`}>{opt}</div>
      </div>
    </>
  );
};

export default McqOption;
