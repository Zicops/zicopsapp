import Accordion from '../../../common/Accordion';
import McqCard from '../../McqCard';
import styles from './questionSection.module.scss';

const QuestionSection = ({ quesSection }) => {
  const numOfQuestion = 5;
  return (
    <>
      <div className={`${styles.sectionContainer}`}>
        {quesSection.secA !== undefined && (
          <Accordion title={'Section A'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{numOfQuestion}</span>
              </p>
            </div>
            {quesSection.secA === undefined &&
              quesSection.secA?.map((item) => (
                <div>
                  <div className={`${styles.line}`}></div>
                  <McqCard question={item.question} />
                </div>
              ))}
          </Accordion>
        )}
        {quesSection.secB !== undefined && (
          <Accordion title={'Section B'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{numOfQuestion}</span>
              </p>
            </div>
            {quesSection.secB.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
        )}
        {quesSection.secC !== undefined && (
          <Accordion title={'Section C'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{numOfQuestion}</span>
              </p>
            </div>
            {quesSection.secC.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
        )}
        {quesSection.secD !== undefined && (
          <Accordion title={'Section D'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{numOfQuestion}</span>
              </p>
            </div>
            {quesSection.secD.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
        )}
      </div>
    </>
  );
};

export default QuestionSection;
