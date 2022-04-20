import Button from '../common/Button';
import styles from './mcqCard.module.scss';
import McqOption from './McqOption';
const McqCard = ({ question }) => {
  const obj = {
    option: 'a',
    hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  };
  obj.src = '/images/courses/1.png';
  return (
    <>
      <div className={`${styles.mcq_container}`}>
        <span style={{ margin: '0 auto' }}>QUESTION</span>
        <div style={{ margin: '10px' }}>
          <p>
            <span className={`${styles.span_element}`}>Q.</span>
            {question}
          </p>
        </div>
        <section className={`${styles.option_container}`}>
          <McqOption obj={obj} />
          <McqOption obj={{ ...obj, text: 'option b', src: undefined, option: 'b' }} />
          <McqOption obj={{ ...obj, option: 'c' }} />
          <McqOption obj={{ ...obj, option: 'd' }} />
        </section>
        <span className={`${styles.span_element}`}>Hint:</span>
        <div>{obj.hint}</div>
        <div className={`${styles.btn}`}>
          <Button text={'Edit'} />
          <Button text={'Cancel'} />
        </div>
      </div>
    </>
  );
};

<></>;
export default McqCard;
