import QuestionOptionView from '@/components/common/QuestionOptionView';
import { data as examData } from '@/components/LearnerExamComp/Logic/exam.helper';
import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import Accordion from '../../../common/Accordion';
import styles from '../questionPaperPreview.module.scss';
import QuestionStatus from '../QuestionStatus';

export default function QuestionSection({
  setIsQuestion,
  setOption,
  data,
  setData,
  setCurrent,
  isPreview
}) {
  let learnerExamData = useRecoilValue(LearnerExamAtom);
  if (!learnerExamData?.examData?.id) learnerExamData = examData;
  // console.log('ssssss');

  // console.log(learnerExamData?.examData?.id ? section?.questions : questionData);

  return (
    <>
      <div className={`${styles.sectionContainer}`}>
        {learnerExamData?.examData?.id ? (
          <>
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

                    {section?.questions?.map((id, i) => {
                      let each = data?.filter((q) => q?.question?.id === id)[0];
                      if (!each) return null;

                      return (
                        <div className={`${styles.questionInnerContainer}`} key={each?.id}>
                          <div className={`${styles.qstatusContainer}`}>
                            <span />
                            <QuestionStatus each={each} />
                          </div>
                          <div className={`${styles.QuestionContainer}`}>
                            <div
                              className={`${styles.questionContainerInnerContainer}`}
                              onClick={() => {
                                setCurrent(data.filter((e) => e.id === each.id)[0]);
                                setData(
                                  data.map((obj) => {
                                    if (obj.id === each.id) return { ...obj, isVisited: true };
                                    return obj;
                                  })
                                );
                                setOption(data.filter((e) => e.id === each.id)[0]?.selectedOption);
                                setIsQuestion(false);
                              }}>
                              <QuestionOptionView
                                questionCount={i + 1}
                                questionData={each.question}
                                optionData={each.options}
                                showType="none"
                                showHints={learnerExamData?.examData?.display_hints}
                                selectedAnswerId={each?.selectedOption}
                              />
                              {/* <McqCard
                            each={each}
                            setIsQuestion={setIsQuestion}
                            setOption={setOption}
                            data={data}
                            setData={setData}
                            current={current}
                            setCurrent={setCurrent}
                          /> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Accordion>
                </Fragment>
              );
            })}
          </>
        ) : (
          <>
            <Accordion title={'Default Section'}>
              <div className={`${styles.questionTop}`}>
                {/* <p>{questionObj?.description}</p> */}
                <p>
                  Questions: <span>{examData?.landingPageData?.totalQuestions}</span>
                </p>
              </div>

              {data?.map((each, i) => {
                console.log(each);
                return (
                  <Fragment key={i}>
                    <div className={`${styles.questionInnerContainer}`} key={each?.id}>
                      <div className={`${styles.qstatusContainer}`}>
                        <span />
                        <QuestionStatus each={each} />
                      </div>

                      <div className={`${styles.QuestionContainer}`}>
                        <div
                          className={`${styles.questionContainerInnerContainer}`}
                          onClick={() => {
                            setCurrent(data.filter((e) => e.id === each.id)[0]);
                            setData(
                              data.map((obj) => {
                                if (obj.id === each.id) return { ...obj, isVisited: true };
                                return obj;
                              })
                            );
                            setOption(data.filter((e) => e.id === each.id)[0]?.selectedOption);
                            setIsQuestion(false);
                          }}>
                          <QuestionOptionView
                            questionCount={i + 1}
                            questionData={each.question}
                            optionData={each.options?.map((o) => {
                              o.isCorrect = null;
                              return o;
                            })}
                            showType="none"
                            showHints={learnerExamData?.examData?.display_hints}
                            selectedAnswerId={each?.selectedOption}
                          />
                          {/* <McqCard
                      each={each}
                      setIsQuestion={setIsQuestion}
                      setOption={setOption}
                      data={data}
                      setData={setData}
                      current={current}
                      setCurrent={setCurrent}
                      /> */}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </Accordion>
          </>
        )}
      </div>
    </>
  );
}
