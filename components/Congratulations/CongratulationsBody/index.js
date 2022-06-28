import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { useRecoilValue } from 'recoil';
import styles from './congratulationsBody.module.scss';

const CongratulationsBody = ({ data, style }) => {
  const learnerExamData = useRecoilValue(LearnerExamAtom);

  return (
    <>
      <div className={`${styles.congratulations_Body}`}>
        <table className={`${styles.table_style}`} border="1">
          <thead>
            <tr>
              <td>Attempt:</td>
              <td>Exam Score:</td>
              <td>Result:</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1/3</td>
              <td>
                {learnerExamData?.resultData?.examScore || 0} /{' '}
                {learnerExamData?.examData?.totalMarks || 0}
              </td>
              <td style={{ color: style.color }}>{data.result}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CongratulationsBody;
