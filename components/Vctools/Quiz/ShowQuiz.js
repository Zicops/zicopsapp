import { quizArray } from "@/state/atoms/vctool.atoms";
import { useRecoilValue } from "recoil";
import QuizQuestion from "../QuizQuestion";
import styles from "../vctoolMain.module.scss"
const ShowQuiz = ({addQuiz}) => {
    const quizArr=useRecoilValue(quizArray)
    return (
        <div className={`${styles.showQuizContainer}`}>
            <div className={`${styles.availableQuizSCreen}`}>
                   {
                    quizArr.map((data)=>
                    {
                        return (data.quizName!=='' && data.quizQuestion!=='') && <QuizQuestion QuizQuestion={data.quizQuestion}/>
                    })
                   }
            </div>
            <button className={`${styles.addQuizBtn}`} onClick={() => {
                addQuiz()
            }}><div>+</div>Add Quiz</button>
        </div>
    )
};
export default ShowQuiz;