import Accordion from '../../../../common/Accordion';
import McqCard from '../../../McqCard';
import QuestionStatus from '../QuestionStatus';
import { useState } from 'react';
import styles from '../questionPaperPreview.module.scss';

const QuestionSection = ({ quesSection, setIsQuestion, setOption, data, setData, current, setCurrent }) => {

  const [isLearner, setIsLearner] = useState(true);
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
        {/*{quesSection.secB !== undefined && (*/}
        {/*  <Accordion title={'Section B'}>*/}
        {/*    <div className={`${styles.questionTop}`}>*/}
        {/*      <p>Lorem ipsum is just some dummy text for use of our own.</p>*/}
        {/*      <p>*/}
        {/*        Questions: <span>{quesSection.secB.length}</span>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    {quesSection.secB.map((item) => (*/}
        {/*      <div className={`${styles.questionInnerContainer}`}>*/}
        {/*        {isLearner && (*/}
        {/*          <div className={`${styles.qstatusContainer}`}>*/}
        {/*            <QuestionStatus qStatus={'Unattempted'} />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        <div className={`${styles.QuestionContainer}`}>*/}
        {/*          /!* <div className={`${styles.line}`}></div> *!/*/}
        {/*          <div className={`${styles.questionContainerInnerContainer}`}>*/}
        {/*            <McqCard question={item.question} />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </Accordion>*/}
        {/*)}*/}
        {/*{quesSection.secC !== undefined && (*/}
        {/*  <Accordion title={'Section C'}>*/}
        {/*    <div className={`${styles.questionTop}`}>*/}
        {/*      <p>Lorem ipsum is just some dummy text for use of our own.</p>*/}
        {/*      <p>*/}
        {/*        Questions: <span>{quesSection.secC.length}</span>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    {quesSection.secC.map((item) => (*/}
        {/*      <div className={`${styles.questionInnerContainer}`}>*/}
        {/*        {isLearner && (*/}
        {/*          <div className={`${styles.qstatusContainer}`}>*/}
        {/*            <QuestionStatus qStatus={'Marked'} />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        <div className={`${styles.QuestionContainer}`}>*/}
        {/*          /!* <div className={`${styles.line}`}></div> *!/*/}
        {/*          <div className={`${styles.questionContainerInnerContainer}`}>*/}
        {/*            <McqCard question={item.question} />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </Accordion>*/}
        {/*)}*/}
        {/*{quesSection.secD !== undefined && (*/}
        {/*  <Accordion title={'Section D'}>*/}
        {/*    <div className={`${styles.questionTop}`}>*/}
        {/*      <p>Lorem ipsum is just some dummy text for use of our own.</p>*/}
        {/*      <p>*/}
        {/*        Questions: <span>{quesSection.secD.length}</span>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    {quesSection.secD.map((item) => (*/}
        {/*      <div className={`${styles.questionInnerContainer}`}>*/}
        {/*        {isLearner && (*/}
        {/*          <div className={`${styles.qstatusContainer}`}>*/}
        {/*            <QuestionStatus qStatus={'Unattempted'} />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        <div className={`${styles.QuestionContainer}`}>*/}
        {/*          /!* <div className={`${styles.line}`}></div> *!/*/}
        {/*          <div className={`${styles.questionContainerInnerContainer}`}>*/}
        {/*            <McqCard question={item.question} />*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </Accordion>*/}
        {/*)}*/}
      </div>
    </>
  );
};

export default QuestionSection;
