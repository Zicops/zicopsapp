import styles from '../questionPaperPreview.module.scss';
import { obj } from './Logic/questionTop';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import { LearnerExamAtom } from '../../../../state/atoms/exams.atoms';
import { useRecoilValue } from 'recoil';
const QuestionPaperTop = ({ data, setIsQuestion }) => {
  
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  console.log(data, learnerExamData);
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.middleSection}`}>
          <span />
          <p>
            QUESTION PAPER NAME
          </p>
          <IconButton onClick={() => {setIsQuestion(false)}}>
            <CloseIcon sx={{color: '#FFF'}} />
          </IconButton>
        </div>
        <p  className={`${styles.description}`}>{obj.description}</p>

        <div className={`${styles.lowerSection}`}>
          <p>
            Total No. of Question: <span>{data.length}</span>
          </p>
          <p>
            Total Marks: <span>{obj.Total_M}</span>
          </p>
          <p>
            Passing Marks: <span>{obj.Passing_M}</span>
          </p>
          <p>
            Duration: <span>{obj.Duration}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionPaperTop;
