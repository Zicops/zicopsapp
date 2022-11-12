import { useRouter } from 'next/router';
import AttemptsTable from '../common/AttemptsTable';
import CongratulationsScreenButton from '../common/CongratulationsScreenButton';
import ToolTip from '../common/ToolTip';
import CongratulationsFooter from './CongratulationsFooter';
import CongratulationsHead from './CongratulationsHead';
import CongratulationsScreen from './CongratulationsScreen';
import { data, getResultStyles } from './Logic/congratulationsHead.helper';

const Congratulations = (props) => {
  const {
    resultIndex,
    attemptData,
    isSampleTest,
    handleReturnToMainScreen,
    handleDownload = () => {},
    downloadBtn = ''
  } = props;

  const router = useRouter();
  const cpId = router?.query?.cpId || '';
  const examId = router?.query?.examId || '';

  const style = getResultStyles(data[resultIndex].result);
  // console.log(style);
  return (
    <div style={{ width: '70%' }}>
      <CongratulationsScreen>
        <CongratulationsHead
          {...props}
          // user_name={`${userData?.first_name || ''} ${userData?.last_name || ''}`}
          // exam_name={learnerExamData?.examData?.name || ''}
          data={data[resultIndex]}
          style={style}
        />
        <AttemptsTable
          {...props}
          attemptData={[{ ...attemptData, result: data[resultIndex].result }]}
          customStyle={{ maxWidth: 'none' }}
          // totalAttempts={3}
          // attemptData={[
          //   {
          //     attempt: currentAttemptData?.attempt_no || 1,
          //     examScore: learnerExamData?.resultData?.examScore,
          //     totalMarks: learnerExamData?.examData?.totalMarks,
          //     result: data[resultIndex].result
          //   }
          // ]}
        />
      </CongratulationsScreen>
      <CongratulationsFooter>
        <CongratulationsScreenButton
          // title={downloadBtn}
          disable={true}
          handleClick={handleDownload}
          title={
            <ToolTip title="Download your result" placement="bottom">
              <span>Download Result</span>
            </ToolTip>
          }
        />
        <CongratulationsScreenButton
          handleClick={() => {
            const answerKeyRoute = `/answer-key/cp/${cpId}/exam/${examId}`;
            router.push(`${answerKeyRoute}?attemptId=${attemptData?.attemptId}`, answerKeyRoute);
          }}
          // title={'View Attempt History'}
          disable={isSampleTest}
          title={
            <ToolTip title="View all attempts" placement="bottom">
              <span>View Attempt History</span>
            </ToolTip>
          }
        />

        <CongratulationsScreenButton
          title={
            <ToolTip title="Exit and go back to course" placement="bottom">
              <span>Exit And Return To Main Screen</span>
            </ToolTip>
          }
          handleClick={handleReturnToMainScreen}
        />
      </CongratulationsFooter>
    </div>
  );
};

export default Congratulations;
