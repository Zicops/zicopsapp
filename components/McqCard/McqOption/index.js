import styles from './mcqOption.module.scss';

const McqMain = ({ obj }) => {
  const opt =
    obj.src === undefined ? <b>{obj.text}</b> : <img src={`${obj.src}`} alt="Not found" />;
  console.log(obj);

  return (
    <>
      <div className={`${styles.options}`}>
        {obj.option}. {opt}
      </div>
    </>
  );
};

export default McqMain;
