import AttemptsTable from '@/components/common/AttemptsTable';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import QuestionOptionView from '@/components/common/QuestionOptionView';
import { getResultStyles } from '@/components/Congratulations/Logic/congratulationsHead.helper';
import { LearnerExamAtom, QuestionOptionDataAtom } from '@/state/atoms/exams.atoms';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styles from './answerKey.module.scss';

export default function AnswerKeyPage() {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const questionOptionData = useRecoilValue(QuestionOptionDataAtom);
  const router = useRouter();

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
              result: learnerExamData?.resultData?.isPassed ? 'PASS' : 'FAIL'
            }
          ]}
          style={getResultStyles(learnerExamData?.resultData?.isPassed ? 'PASS' : 'FAIL')}
        />
      </div>

      {/* questions */}
      <QuestionOptionView />
    </div>
  );
}
