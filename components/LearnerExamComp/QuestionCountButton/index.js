import {questionData} from '../Logic/questionData.helper'
import QuestionButton from '../QuestionButton'
import styles from './questionCountStyle.module.scss'


const QuestionCountButtonSection = ({data, setData, current, setCurrent, filterData}) => {
    return (
        <div className={`${styles.questionCountContainer}`}>
            {
                filterData === 'all' && data.map((each)=>{
                    return <QuestionButton each={each} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                })
            }
            {
                filterData === 'attempted' && data.filter(obj => obj.selectedOption !== null).map((each)=>{
                    return <QuestionButton each={each} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                })
            }
            {
                filterData === 'marked' && data.filter(obj => obj.isMarked === true).map((each)=>{
                    return <QuestionButton each={each} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                })
            }
            {
                filterData === 'unattempted' && data.filter(obj => (obj.isVisited === true) && (obj.selectedOption === null)).map((each)=>{
                    return <QuestionButton each={each} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                })
            }
            {
                filterData === 'unvisited' && data.filter(obj => obj.isVisited === false).map((each)=>{
                    return <QuestionButton each={each} data={data} setData={setData} current={current} setCurrent={setCurrent}/>
                })
            }
        </div>
    )
}

export default QuestionCountButtonSection