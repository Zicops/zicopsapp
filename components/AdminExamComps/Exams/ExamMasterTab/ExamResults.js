// components\AdminExamComps\Exams\ExamMasterTab\ExamResults.js

import IconBtn from '@/components/common/IconBtn';
import PopUp from '@/components/common/PopUp';
import { getPassingMarks } from '@/components/LearnerExamComp/Logic/exam.helper';
import { ExamTabDataAtom } from '@/state/atoms/exams.atoms';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './examMasterTab.module.scss';
import useHandleExamResults from './Logic/useHandleExamResults';

export default function ExamResults() {
  const [showDetailsResults, setShowDetailsResults] = useState(false);
  const { examResultsData } = useHandleExamResults();
  const examTabData = useRecoilValue(ExamTabDataAtom);

  const passingMarks = getPassingMarks(
    `${examTabData?.passing_criteria}-${examTabData?.passing_criteria_type}`,
    examTabData?.total_marks
  );

  const examData = {
    numberOfAttempts: examResultsData?.allAttempts?.length,
    uniqueAttempts: [...new Set(examResultsData?.allUserIds)]?.length,

    passedParticipants: +passingMarks === 0 ? 'N/A' : examResultsData?.usersPassed,
    failedParticipants: +passingMarks === 0 ? 'N/A' : examResultsData?.usersFailed,

    averageMarks: examResultsData?.averageMarks?.toPrecision(4),
    highestMarks: examResultsData?.highestMarks,
    lowestMarks: examResultsData?.lowestMarks
  };

  return (
    <>
      <div className={styles.examResultsContainer}>
        <ul className={styles.list}>
          <li>Total Number of attempts: {examData?.numberOfAttempts}</li>
          <li>Total Number of unique attempts: {examData?.uniqueAttempts} </li>
          <li>Number of participants passed: {examData?.passedParticipants} </li>
          <li>Number of participants failed: {examData?.failedParticipants} </li>
          <li>Average Marks Obtained: {examData?.averageMarks} </li>
          <li>Highest Marks Obtained: {examData?.highestMarks} </li>
          <li>Lowest Marks Obtained: {examData?.lowestMarks} </li>
        </ul>

        <div className={styles.btns}>
          <IconBtn handleClick={() => setShowDetailsResults(true)}>View Attempted Results</IconBtn>
          <IconBtn>Download Results</IconBtn>
        </div>
      </div>

      {/* preview popup */}
      {!!showDetailsResults && (
        <PopUp
          title={'Individual Performance of Participants'}
          popUpState={[showDetailsResults, setShowDetailsResults]}
          isFooterVisible={false}>
          Result data
        </PopUp>
      )}
    </>
  );
}
