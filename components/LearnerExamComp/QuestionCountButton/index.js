import {questionData} from '../Logic/questionData.helper'
import QuestionButton from '../QuestionButton'
import styles from './questionCountStyle.module.scss'



  

const QuestionCountButtonSection = () => {
    return (
        <div className={`${styles.questionCountContainer}`}>
            {
                questionData.map((items)=>{
                    const {QuestionNumber, check} = items
                    return <QuestionButton data={QuestionNumber} check={check}/>
                })
            }
        </div>
    )
}

export default QuestionCountButtonSection