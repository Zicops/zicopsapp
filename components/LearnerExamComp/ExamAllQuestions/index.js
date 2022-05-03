import ExamQuestions from "../ExamQuestions"
import { questionData } from "../Logic/questionData.helper"
import styles from './examAllQuestion.module.scss'

const ExamAllQuestions = () => {
  return (
    <div className={`${styles.exam_questions}`}>
        <ExamQuestions question={questionData[0].question} questionimage={questionData[0].imgLink} questionnumber={questionData[0].QuestionNumber}/>
    </div>
  )
}

export default ExamAllQuestions