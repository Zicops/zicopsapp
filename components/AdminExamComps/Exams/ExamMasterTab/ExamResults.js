// components\AdminExamComps\Exams\ExamMasterTab\ExamResults.js

import IconBtn from '@/components/common/IconBtn';
import Loader from '@/components/common/Loader';
import PopUp from '@/components/common/PopUp';
import { getPassingMarks } from '@/components/LearnerExamComp/Logic/exam.helper';
import { parseJson, secondsToHMS } from '@/helper/utils.helper';
import { ExamTabDataAtom } from '@/state/atoms/exams.atoms';
import moment from 'moment';
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
    lowestMarks: examResultsData?.lowestMarks,

    userExamResult: examResultsData?.allAttempts || null
  };

  let serialNo = 0;

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
          size="large"
          isFooterVisible={false}>
          {examData?.userExamResult != null ? (
            <div className={styles.resultsTable}>
              <table>
                <thead>
                  <tr>
                    <td>Sr No</td>
                    <td>Attempted By</td>
                    <td>Attempt Number</td>
                    <td>Time Taken</td>
                    <td>Finished At</td>
                    <td>Marks Obtained</td>
                    <td>No of questions answered correctly</td>
                    <td>No of questions answered incorrect</td>
                    <td>Result Status</td>
                  </tr>
                </thead>

                <tbody>
                  {examData?.userExamResult?.length ? (
                    examData?.userExamResult?.map((attemptData) => {
                      if (!attemptData?.resultData) return;

                      const results = attemptData?.resultData?.results?.[0];
                      const status = parseJson(results?.result_status)?.status;
                      const resultStatus = +passingMarks === 0 ? 'completed' : status;

                      return (
                        <tr key={attemptData?.user_ea_id}>
                          <td>{++serialNo}</td>
                          <td>
                            {attemptData?.userData?.first_name} {attemptData?.userData?.last_name}
                          </td>
                          <td>{attemptData?.attempt_no}</td>
                          <td>{secondsToHMS(attemptData?.attempt_duration)}</td>
                          <td>
                            {moment.unix(results?.finishedAt || results?.created_at).format('LLL')}
                          </td>
                          <td>{results?.user_score}</td>
                          <td>{results?.correct_answers}</td>
                          <td>{results?.wrong_answers}</td>
                          <td
                            className={`${
                              resultStatus?.includes('failed') ? styles.red : styles.green
                            } ${styles.result}`}>
                            {resultStatus}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} className={styles.fallback}>
                        No Attempts Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <Loader customStyles={{ maxHeight: '300px' }} />
          )}
        </PopUp>
      )}
    </>
  );
}
