import { height } from "@mui/system";
import { useState } from "react"
import styles from "../vctoolMain.module.scss"
const QuizQuestion = ({ QuizQuestion, }) => {
    const [expand, setexpand] = useState(true)
    return (
        <div className={`${styles.quizQuestion}`}>
            <div className={`${styles.quizQuestionhead}`} >
                <div className={`${styles.quizLable}`}>
                    <img src="/images/svg/vctool/quiz.svg" />
                    <div style={{
                        color: "white",
                        fontSize: "14px"
                    }}>Quiz</div>
                </div>
                <div className={`${styles.quizeExpand}`}>
                    <button onClick={() => {
                        setexpand(!expand)
                    }}>
                        {
                            <img src={expand ? "/images/svg/vctool/expand-more.svg" : "/images/svg/vctool/expand-less.svg"} />
                        }
                    </button>
                </div>
            </div>

            <div>
                {
                    !expand ? <div className={`${styles.pollQuestionScreen}`} >
                        <div className={`${styles.pollSavedLabel}`}>Saved</div>
                        <div className={`${styles.pollQuestions}`}>{QuizQuestion}</div>
                        <div className={`${styles.pollBoxOptions}`}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className={`${styles.pollBoxBtns}`}>
                            <button className={`${styles.pollBoxDeleteBnt}`}>Delete</button>
                            <button className={`${styles.pollBoxEditBnt}`}>Edit</button>
                        </div>
                        {/* <button className={`${styles.publishPoll}`}>Publish</button> */}
                    </div> : ""
                }
            </div>
        </div>
    )
};
export default QuizQuestion;
