import Accordion from '../../../common/Accordion';
import McqCard from '../../McqCard';
import QuestionStatus from '../QuestionStatus';
import { useState } from 'react';
import styles from '../questionPaperPreview.module.scss';

const QuestionSection = ({ quesSection, setIsQuestion, setOption, data, setData, current, setCurrent }) => {

  return (
    <>
      <div className={`${styles.sectionContainer}`}>
          <Accordion title={'Section A'}>
              <div className={`${styles.questionTop}`}>
                  <p>Lorem ipsum is just some dummy text for use of our own.</p>
                  <p>
                      Questions: <span>{data.length}</span>
                  </p>
              </div>
              {data.map((each) => (
                  <div className={`${styles.questionInnerContainer}`}>
                      <div className={`${styles.qstatusContainer}`}>
                          <span />
                          <QuestionStatus each={each} />
                      </div>
                      <div className={`${styles.QuestionContainer}`}>
                          <div className={`${styles.questionContainerInnerContainer}`}>
                              <McqCard each={each}
                                       setIsQuestion={setIsQuestion}
                                       setOption={setOption}
                                       data={data} setData={setData}
                                       current={current} setCurrent={setCurrent}
                              />
                          </div>
                      </div>
                  </div>
              ))}
          </Accordion>
      </div>
    </>
  );
};

export default QuestionSection;
