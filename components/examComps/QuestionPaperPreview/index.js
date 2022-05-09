import styles from './questionPaperPreview.module.scss';
import QuestionSection from './QuestionSection';
import QuestionPaperTop from './QuestionPaperTop';
import PopUp from '../../common/PopUp';
import { useState } from 'react';
import { questionList } from './Logic/QuestionPaperPreview.helper';

const QuestionPaperPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const quesSection = {};
  // thinking about pushing value to quesSection.sec_A array. similarly to other elements.

  questionList.forEach((item) => {
    // if (item.section === 'A') {
    //   quesSection.secA.push(item);
    //   console.log(quesSection.secA.length);
    // }
    // if (item.section === 'B') {
    //   quesSection.secB.push(item);
    // }
    // if (item.section === 'C') {
    //   quesSection.secC.push(item);
    // }
    // if (item.section === 'D') {
    //   quesSection.secD.push(item);
    // }

    let secKey = `sec${item.section}`;
    quesSection.hasOwnProperty(secKey)
      ? quesSection[secKey].push(item)
      : (quesSection[secKey] = [item]);
  });

  console.log(quesSection);

  return (
    <>
      <div className={`${styles.container}`}>
        <button onClick={() => setIsOpen(!isOpen)}>Clck me</button>
        <PopUp title={'Core Java Fundamental'} isPopUpOpen={isOpen}>
          <div className={`${styles.paperContainer}`}>
            <QuestionPaperTop />
            <QuestionSection quesSection={quesSection} />
          </div>
        </PopUp>
      </div>
    </>
  );
};

export default QuestionPaperPreview;
