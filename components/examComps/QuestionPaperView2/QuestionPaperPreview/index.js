import styles from './questionPaperPreview.module.scss';
import QuestionSection from './QuestionSection';
import QuestionPaperTop from './QuestionPaperTop';
import PopUp from '../../../common/PopUp';
import { useState } from 'react';
import { questionList } from './Logic/QuestionPaperPreview.helper';

const QuestionPaperView2 = ({setIsQuestion, setOption, data, setData, current, setCurrent}) => {
  const [isOpen, setIsOpen] = useState(false);
  const quesSection = {};
  // thinking about pushing value to quesSection.sec_A array. similarly to other elements.

  questionList.forEach((item) => {
    let secKey = `sec${item.section}`;
    quesSection.hasOwnProperty(secKey)
      ? quesSection[secKey].push(item)
      : (quesSection[secKey] = [item]);
  });

  return (
    <>
      {/*<div className={`${styles.Maincontainer}`}>*/}
        {/* <button onClick={() => setIsOpen(!isOpen)}>Clck me</button> */}
        {/* <PopUp title={'Core Java Fundamental'} isPopUpOpen={isOpen} isFooterVisible={false}> */}
          <div className={`${styles.paperContainer}`}>
            <QuestionPaperTop setIsQuestion={setIsQuestion} data={data} />
            <QuestionSection
                setIsQuestion={setIsQuestion}
                quesSection={quesSection} setOption={setOption}
                data={data} setData={setData}
                current={current} setCurrent={setCurrent}
            />
          </div>
        {/* </PopUp> */}
      {/*</div>*/}
    </>
  );
};

export default QuestionPaperView2;
