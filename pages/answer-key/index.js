import Accordion from '@/components/common/Accordion';
import AttemptsTable from '@/components/common/AttemptsTable';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import QuestionOptionView from '@/components/common/QuestionOptionView';
import { getResultStyles } from '@/components/Congratulations/Logic/congratulationsHead.helper';
import QuestionSection from '@/components/examComps/NewQuestionPaperPreview/QuestionSection';
import { LearnerExamAtom, QuestionOptionDataAtom } from '@/state/atoms/exams.atoms';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './answerKey.module.scss';

export default function AnswerKeyPage() {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const questionOptionData = useRecoilValue(QuestionOptionDataAtom);
  const router = useRouter();

  const result = ['PASS', 'FAIL', 'Completed'];
  const isShowResult = learnerExamData?.examData?.show_result || false;

  let resultIndex = 2;
  if (isShowResult) resultIndex = learnerExamData?.resultData?.isPassed ? 0 : 1;

  const isShowRightAnswer = learnerExamData?.examData?.show_answer || false;

  return (
    <div className={`${styles.answerKey}`}>
      <div className={`${styles.backBtn}`}>
        <button onClick={() => router.back()}>
          <img src="./images/Back.png" />
        </button>
      </div>

      <h2 className={`h2`}>{learnerExamData?.examData?.name || 'Exam Name'}</h2>

      <LabeledDropdown
        dropdownOptions={{
          placeholder: 'Attempts',
          options: [],
          // value: { value: examTabData?.no_attempts, label: examTabData?.no_attempts },
          isDisabled: true
        }}
        styleClass={styles.dropdownInput}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData, 'no_attempts')}
      />

      <div className={`${styles.tableContainer}`}>
        <p>Results</p>
        <AttemptsTable
          totalAttempts={3}
          attemptData={[
            {
              attempt: 1,
              examScore: learnerExamData?.resultData?.examScore,
              totalMarks: learnerExamData?.examData?.totalMarks,
              result: result[resultIndex]
            }
          ]}
          style={getResultStyles(result[resultIndex])}
        />
      </div>

      {/* questions */}
      <div className={`${styles.questionPaper}`}>
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
                  const each = questionOptionData?.filter((q) => q?.question?.id === id)[0];

                  if (!each) return null;

                  return (
                    <div className={`${styles.questionCard}`} key={each?.id}>
                      <QuestionOptionView
                        questionCount={each.id}
                        questionData={each.question}
                        optionData={isShowRightAnswer ? null : each.options}
                        compareCorrect={isShowRightAnswer}
                        selectedAnswerId={each?.selectedOption}
                        showType={isShowRightAnswer ? 'marksObtained' : 'marks'}
                        showHints={learnerExamData?.examData?.display_hints}
                      />
                    </div>
                  );
                })}
              </Accordion>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
