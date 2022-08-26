import { GET_EXAM_CONFIG } from '@/api/Queries';
import { GET_USER_EXAM_ATTEMPTS, GET_USER_EXAM_RESULTS, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { secondsToHMS } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../common/Button';
import { getDateTimeFromUnix } from '../Tabs/Logic/tabs.helper';
import styles from './attemptHistory.module.scss';

const AttempHistory = ({ examId = null, userCourseProgressId = null, handleClose }) => {
  const [tableData, setTableData] = useState();

  const userData = useRecoilValue(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  useEffect(async () => {
    const attemptRes = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: userData?.id, user_lsp_id: 'Zicops' },
      {},
      userQueryClient
    );
    if (attemptRes?.error) return setToastMsg({ type: 'danger', message: 'Attempts Load Error' });

    const attemptData =
      attemptRes?.getUserExamAttempts
        ?.filter(
          (ea) =>
            ea?.exam_id === examId &&
            ea?.user_cp_id === userCourseProgressId &&
            ea?.attempt_status === 'completed'
        )
        ?.sort((a1, a2) => a1?.attempt_no - a2?.attempt_no) || [];

    if (!attemptData?.length) return setTableData(null);

    for (let i = 0; i < attemptData.length; i++) {
      const attempt = attemptData[i];

      const resultRes = await loadQueryDataAsync(
        GET_USER_EXAM_RESULTS,
        { user_id: userData?.id, user_ea_id: attempt?.user_ea_id },
        {},
        userQueryClient
      );

      if (resultRes?.error) return setToastMsg({ type: 'danger', message: 'Result Load Error' });
      attemptData[i].result = resultRes?.getUserExamResults || [];
    }

    const examConfigRes = await loadQueryDataAsync(GET_EXAM_CONFIG, { exam_id: examId });
    const configData = examConfigRes?.getExamConfiguration[0];
    console.log(attemptData, configData);

    const _tableData = [];

    function getFormattedDate(unixDate) {
      return moment(getDateTimeFromUnix(unixDate)).format('LLL');
    }

    attemptData?.forEach((ea) => {
      const resultData = JSON.parse(ea?.result?.result_status);

      const data = {
        Attempt: `Attempt ${ea?.attempt_no}`,
        StartedAt: getFormattedDate(ea?.attempt_start_time),
        FinishedAt: getFormattedDate(resultData?.finishedAt || ea?.result?.created_at),
        TotalDuration: secondsToHMS(ea?.attempt_duration),
        Score: `${ea?.result?.user_score} / ${resultData?.totalMarks}`,
        Result: configData?.ShowResult ? resultData?.status : 'completed'
      };
      _tableData.push(data);
    });

    if (_tableData?.length) setTableData(_tableData);
  }, [examId, userCourseProgressId]);

  return (
    <Popup open={true} closeOnDocumentClick={false} closeOnEscape={false}>
      <div className={styles.resultTable}>
        <h2>Attempt History</h2>
        {/* <table>
        <tr key={'x'}>
          {Object.keys(data[0]).map((key) => (
            <td>{key}</td>
          ))}
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
        <Button text="Close" styleClass={styles.closeBtn} onClick={handleChange} />
      </table> */}

        {tableData === undefined && <div className={styles.fallback}>Loading...</div>}

        {tableData !== undefined && !tableData?.length && (
          <div className={styles.fallback}>No Attempts Data Found</div>
        )}

        {tableData?.length && (
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <td>Attempt</td>
                  <td>Started At</td>
                  <td>Finished At</td>
                  <td>Duration</td>
                  <td>Score</td>
                  <td>Result</td>
                </tr>
              </thead>

              <tbody>
                {tableData?.map((d) => {
                  return (
                    <tr key={d?.Attempt}>
                      <td
                        style={{
                          color: '#6bcfcf',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                        onClick={() =>
                          router.push(`/answer-key/cp/${userCourseProgressId}/exam/${examId}`)
                        }>
                        {d?.Attempt}
                      </td>
                      <td>{d?.StartedAt} (IST)</td>
                      <td>{d?.FinishedAt} (IST)</td>
                      <td>{d?.TotalDuration}</td>
                      <td>{d?.Score}</td>
                      <td className={d?.Result?.includes('failed') ? styles.red : styles.green}>
                        {d?.Result}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.closeBtnContainer}>
          <Button text="Close" styleClass={styles.closeBtn} clickHandler={handleClose} />
        </div>
      </div>
    </Popup>
  );
};

export default AttempHistory;
