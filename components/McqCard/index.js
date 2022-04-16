import Button from '../common/Button';
import styles from './mcqCard.module.scss';
import McqOption from './McqOption';
const McqMain = ({ question }) => {
  const obj = { option: 'a' };
  obj.src = '/images/courses/1.png';
  console.log(obj.text);
  console.log(obj.src);
  return (
    <>
      <div className={`${styles.mcq_container}`}>
        <span>Question</span>
        <div style={{ marginTop: '20px' }}>Q.{question}</div>
        <section className={`${styles.option_container}`}>
          <McqOption obj={obj} />
          <McqOption obj={{ ...obj, text: 'option b', src: undefined }} />
          <McqOption obj={obj} />
          <McqOption obj={obj} />
        </section>
        Hint:
        <div className={`${styles.btn}`}>
          <Button text={'Edit'} />
          <Button text={'Cancel'} />
        </div>
      </div>
    </>
  );
};

<></>;
export default McqMain;
