import Accordion from '../../../../common/Accordion';
import McqCard from '../../../McqCard';
import QuestionStatus from '../QuestionStatus';
import { useState } from 'react';
import styles from '../questionPaperPreview.module.scss';

const QuestionSection = ({ quesSection }) => {
  const [isLearner, setIsLearner] = useState(true);
  return (
    <>
      <div className={`${styles.sectionContainer}`}>
        {quesSection.secA !== undefined && (
          <Accordion title={'Section A'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{quesSection.secA.length}</span>
              </p>
            </div>
            {/* {quesSection.secA === undefined && */}
            {quesSection.secA?.map((item) => (
              <div className={`${styles.questionInnerContainer}`}>
                {isLearner && (
                  <div className={`${styles.qstatusContainer}`}>
                    <QuestionStatus qStatus={'Attempted'} />
                  </div>
                )}
                <div className={`${styles.QuestionContainer}`}>
                  {/* <div className={`${styles.line}`}></div> */}
                  <div
                    className={`${styles.questionContainerInnerContainer}`}
                    onClick={() => {
                      alert(`You Clicked question ${item.question}`);
                    }}>
                    <McqCard question={item.question} />
                  </div>
                </div>
              </div>
            ))}
          </Accordion>
        )}
        {quesSection.secB !== undefined && (
          <Accordion title={'Section B'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{quesSection.secB.length}</span>
              </p>
            </div>
            {quesSection.secB.map((item) => (
              <div className={`${styles.questionInnerContainer}`}>
                {isLearner && (
                  <div className={`${styles.qstatusContainer}`}>
                    <QuestionStatus qStatus={'Unattempted'} />
                  </div>
                )}
                <div className={`${styles.QuestionContainer}`}>
                  {/* <div className={`${styles.line}`}></div> */}
                  <div className={`${styles.questionContainerInnerContainer}`}>
                    <McqCard question={item.question} />
                  </div>
                </div>
              </div>
            ))}
          </Accordion>
        )}
        {quesSection.secC !== undefined && (
          <Accordion title={'Section C'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{quesSection.secC.length}</span>
              </p>
            </div>
            {quesSection.secC.map((item) => (
              <div className={`${styles.questionInnerContainer}`}>
                {isLearner && (
                  <div className={`${styles.qstatusContainer}`}>
                    <QuestionStatus qStatus={'Marked'} />
                  </div>
                )}
                <div className={`${styles.QuestionContainer}`}>
                  {/* <div className={`${styles.line}`}></div> */}
                  <div className={`${styles.questionContainerInnerContainer}`}>
                    <McqCard question={item.question} />
                  </div>
                </div>
              </div>
            ))}
          </Accordion>
        )}
        {quesSection.secD !== undefined && (
          <Accordion title={'Section D'}>
            <div className={`${styles.questionTop}`}>
              <p>Lorem ipsum is just some dummy text for use of our own.</p>
              <p>
                Questions: <span>{quesSection.secD.length}</span>
              </p>
            </div>
            {quesSection.secD.map((item) => (
              <div className={`${styles.questionInnerContainer}`}>
                {isLearner && (
                  <div className={`${styles.qstatusContainer}`}>
                    <QuestionStatus qStatus={'Unattempted'} />
                  </div>
                )}
                <div className={`${styles.QuestionContainer}`}>
                  {/* <div className={`${styles.line}`}></div> */}
                  <div className={`${styles.questionContainerInnerContainer}`}>
                    <McqCard question={item.question} />
                  </div>
                </div>
              </div>
            ))}
          </Accordion>
        )}
      </div>
    </>
  );
};

export default QuestionSection;
