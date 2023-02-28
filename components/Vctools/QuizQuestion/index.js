import { height } from "@mui/system";
import { useState } from "react"
import styles from "../vctoolMain.module.scss"
const QuizQuestion = () => {
    const [expand, setexpand] = useState(true)
    return (
        <div className={`${styles.quizQuestion}`}>
            <div className={`${styles.quizQuestionhead}`} >
                <div className={`${styles.quizLable}`}>
                    <img src="/images/svg/vctool/quiz.svg" />
                    <div style={{
                        color:"white",
                        fontSize:"14px"
                    }}>Quiz</div>
                </div>
                <div className={`${styles.quizeExpand}`}>
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
                !expand ?    <div className={`${styles.questionScreen}`} ></div> :""
            }
          </div>
        </div>
    )
};
export default QuizQuestion;
