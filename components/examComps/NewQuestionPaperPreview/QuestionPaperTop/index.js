import { data, getPassingMarks } from '@/components/LearnerExamComp/Logic/exam.helper';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { LearnerExamAtom } from '../../../../state/atoms/exams.atoms';
import styles from '../questionPaperPreview.module.scss';

const QuestionPaperTop = ({ setIsQuestion }) => {
  let learnerExamData = useRecoilValue(LearnerExamAtom);
  if (!learnerExamData?.examData?.id) learnerExamData = data;
  // console.log(learnerExamData);

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.middleSection}`}>
          <span />
          <p>{learnerExamData?.examData?.paperName?.toUpperCase() || 'QUESTION PAPER'}</p>
          <IconButton
            onClick={() => {
              setIsQuestion(false);
            }}>
            <CloseIcon sx={{ color: '#FFF' }} />
          </IconButton>
        </div>
        <p className={`${styles.description}`}>{learnerExamData?.examData?.description || ''}</p>

        <div className={`${styles.lowerSection}`}>
          <p>
            Total No. of Question:{' '}
            <span>{learnerExamData?.landingPageData?.totalQuestions || 0}</span>
          </p>
          <p>
            Total Marks: <span>{learnerExamData?.examData?.totalMarks || 0}</span>
          </p>
          <p>
            Passing Marks:{' '}
            <span>
              {getPassingMarks(
                learnerExamData?.examData?.passingCriteria,
                learnerExamData?.examData?.totalMarks
              ) || 0}
            </span>
          </p>
          <p>
            Duration: <span>{learnerExamData?.examData?.duration} mins</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionPaperTop;
