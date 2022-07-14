import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import Accordion from '../../../common/Accordion';
import McqCard from '../../McqCard';
import styles from '../questionPaperPreview.module.scss';
import QuestionStatus from '../QuestionStatus';

const QuestionSection = ({
  quesSection,
  setIsQuestion,
  setOption,
  data,
  setData,
  current,
  setCurrent
}) => {
  const learnerExamData = useRecoilValue(LearnerExamAtom);

  return (
    <>
      <div className={`${styles.sectionContainer}`}>
        {learnerExamData?.sectionData?.map((section, i) => {
          return (
            <Fragment key={i}>
              <Accordion title={section?.name}>
                <div className={`${styles.questionTop}`}>
                  <p>{section?.description}</p>
                  <p>
                    Questions:{' '}
                    <span>{section?.total_questions || section?.questions?.length || 0}</span>
                  </p>
                </div>

                {section?.questions?.map((id) => {
                  const each = data?.filter((q) => q?.question?.id === id)[0];

                  if (!each) return null;

                  return (
                    <div className={`${styles.questionInnerContainer}`} key={each?.id}>
                      <div className={`${styles.qstatusContainer}`}>
                        <span />
                        <QuestionStatus each={each} />
                      </div>
                      <div className={`${styles.QuestionContainer}`}>
                        <div className={`${styles.questionContainerInnerContainer}`}>
                          <McqCard
                            each={each}
                            setIsQuestion={setIsQuestion}
                            setOption={setOption}
                            data={data}
                            setData={setData}
                            current={current}
                            setCurrent={setCurrent}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Accordion>
            </Fragment>
          );
        })}
        {/* 
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
                  <McqCard
                    each={each}
                    setIsQuestion={setIsQuestion}
                    setOption={setOption}
                    data={data}
                    setData={setData}
                    current={current}
                    setCurrent={setCurrent}
                  />
                </div>
              </div>
            </div>
          ))}
        </Accordion> */}
      </div>
    </>
  );
};

export default QuestionSection;
