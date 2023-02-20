import { height } from "@mui/system";
import { useState } from "react"
import styles from "../vctoolMain.module.scss"
const QuizQuestion = () => {
    const [expand, setexpand] = useState(true)
    return (
        <div className={`${styles.QuizQuestion}`}>
            <div className={`${styles.QuizQuestion_head}`} >
                <div className={`${styles.Quizlable}`}>
                    <img src="/images/svg/vctool/quiz.svg" />
                    <div style={{
                        color:"white",
                        fontSize:"14px"
                    }}>Quiz</div>
                </div>
                <div className={`${styles.Quize_expand}`}>
                    <button onClick={()=>{
                        setexpand(!expand)
                    }}>
                        {
                            expand ? <img src="/images/svg/vctool/expand-more.svg" />
                                : <img src="/images/svg/vctool/expand-less.svg" />
                        }
                    </button>
                </div>
            </div>
         
          <div>
            {
                !expand ?    <div className={`${styles.QuestionScreen}`} ></div> :""
            }
          </div>
        </div>
    )
};
export default QuizQuestion;
