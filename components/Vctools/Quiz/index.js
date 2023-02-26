import styles from "../vctoolMain.module.scss"
import QuizQuestion from "../QuizQuestion";
const QuizPage = ({ showHide=false }) => {
    return (
        <div className={`${styles.quiz}`}>
            <div className={`${styles.quizHead}`}>
                <div>Quiz</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.quizScreen}`}>
                <div style={{
                    paddingTop: "12px",
                    color: "#ACACAC",
                    fontSize: "14px"
                }}>Un-attempted</div>
                <div className={`${styles.quizUnattempted}`}>
                    <QuizQuestion />
                    <QuizQuestion />
                    <QuizQuestion />
                </div>
                <div style={{
                    paddingTop: "12px",
                    color: "#ACACAC",
                    fontSize: "14px"
                }}>Attempted</div>
                <div className={`${styles.quizAttempted}`}>
                    <QuizQuestion />
                </div>
            </div>
        </div>
    )
};
export default QuizPage;