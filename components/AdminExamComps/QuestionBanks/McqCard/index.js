import Button from '../../../common/Button';
import styles from './mcqCard.module.scss';
import McqOption from './McqOption';

// update this comp later
export default function McqCard({ question, closePopUp, openEditQuestionMasterTab }) {
  const obj = {
    option: 'a',
    hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
  };
  obj.src = '/images/courses/1.png';
  return (
    <>
      <div className={`${styles.mcq_container}`}>
        {/* <span className={`${styles.qtitle}`}>QUESTION</span> */}
        <div className={`${styles.qcontent}`}>
          <p className={`${styles.span_element}`}>
            {/* TODO : Add difficulty lebel */}
            <span>Q.</span>
            {question}
          </p>
        </div>
        {/* <div className={`${styles.span_element}`}>Options:</div> */}
        <section className={`${styles.option_container}`}>
          <McqOption obj={{ ...obj, option: 'a' }} />
          <McqOption obj={{ ...obj, option: 'b', checked: true }} />
          <McqOption obj={{ ...obj, option: 'c' }} />
          <McqOption obj={{ ...obj, option: 'd' }} />
          {/* <McqOption
            obj={{ ...obj, text: 'Wrong Answer', src: undefined, option: 'a' }}
          />
          <McqOption
            obj={{ ...obj, text: 'Wong Answer', src: undefined, option: 'b' }}
          />
          <McqOption
            obj={{ ...obj, text: 'Correct Answer', src: undefined, option: 'c', checked: true }}
          />
          <McqOption
            obj={{ ...obj, text: 'Not Correct Answer', src: undefined, option: 'd'  }}
          /> */}
          {/* <McqOption obj={{ ...obj, option: 'c', src: '/images/Back.png' }} />
          <McqOption obj={{ ...obj, option: 'd' }} /> */}
        </section>
        <span className={`${styles.span_element}`}>Hint:</span>
        <div className={`${styles.hint}`}>{obj.hint}</div>
        <div className={`${styles.btn}`}>
          {openEditQuestionMasterTab && (
            <Button text={'Edit'} clickHandler={openEditQuestionMasterTab} />
          )}
          <Button text={'Cancel'} clickHandler={closePopUp} />
        </div>
      </div>
    </>
  );
}
