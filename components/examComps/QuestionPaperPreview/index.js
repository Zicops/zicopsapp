import styles from './questionPaperPreview.module.scss';
import Accordion from '../../common/Accordion';
import QuestionPaperTop from './QuestionPaperTop';
import PopUp from '../../common/PopUp';
import McqCard from '../McqCard';
import { useState } from 'react';
import { questionList } from './Logic/QuestionPaperPreview.helper';

const QuestionPaperPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const quesSection = { secA: [], secB: [], secC: [], secD: [] };
  // thinking about pushing value to quesSection.sec_A array. similarly to other elements.
  questionList.forEach((item) => {
    if (item.section === 'A') {
      quesSection.secA.push(item);
      console.log(quesSection.secA);
    }
    if (item.section === 'B') {
      quesSection.secB.push(item);
    }
    if (item.section === 'C') {
      quesSection.secC.push(item);
    }
    if (item.section === 'D') {
      quesSection.secD.push(item);
    }
  });

  return (
    <>
      <div className={`${styles.container}`}>
        <button onClick={() => setIsOpen(!isOpen)}>Clck me</button>
        <PopUp title={'Core Java Fundamental'} isPopUpOpen={isOpen}>
          <QuestionPaperTop />
          <Accordion title={'Section A'}>
            {quesSection.secA.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
          <Accordion title={'Section B'}>
            {quesSection.secB.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
          <Accordion title={'Section C'}>
            {quesSection.secC.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
          <Accordion title={'Section D'}>
            {quesSection.secD.map((item) => (
              <div>
                <div className={`${styles.line}`}></div>
                <McqCard question={item.question} />
              </div>
            ))}
          </Accordion>
        </PopUp>
      </div>
    </>
  );
};

export default QuestionPaperPreview;
