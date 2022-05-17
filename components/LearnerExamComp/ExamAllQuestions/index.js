import ExamQuestions from "../ExamQuestions"
import { questionData } from "../Logic/questionData.helper"
import styles from './examAllQuestion.module.scss'

const ExamAllQuestions = ({data, current}) => {
  return (
    <div className={`${styles.exam_questions}`}>
        <ExamQuestions data={current}/>
    </div>
  )
}

export default ExamAllQuestions