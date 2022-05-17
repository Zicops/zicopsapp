import {questionData} from '../Logic/questionData.helper'
import QuestionButton from '../QuestionButton'
import styles from './questionCountStyle.module.scss'


const QuestionCountButtonSection = ({data, setData, current, setCurrent}) => {
    return (
        <div className={`${styles.questionCountContainer}`}>
            {
                data.map((each)=>{
                    return <QuestionButton each={each} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                })
            }
        </div>
    )
}

export default QuestionCountButtonSection