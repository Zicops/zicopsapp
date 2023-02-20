import styles from "../vctoolMain.module.scss"
import QuizQuestion from "../QuizQuestion";
const QuizPage = ({ showHide }) => {
    return (
        <div className={`${styles.Quiz}`}>
            <div className={`${styles.Quiz_head}`}>
                <div>Quiz</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.Quiz_Screen}`}>
                <div style={{
                    paddingTop: "12px",
                    color: "#ACACAC",
                    fontSize: "14px"
                }}>Un-attempted</div>
                <div className={`${styles.Quiz_unattempted}`}>
                    <QuizQuestion />
                    <QuizQuestion />
                    <QuizQuestion />
                </div>
                <div style={{
                    paddingTop: "12px",
                    color: "#ACACAC",
                    fontSize: "14px"
                }}>Attempted</div>
                <div className={`${styles.Quiz_attempted}`}>
                    <QuizQuestion />
                </div>
            </div>
        </div>
    )
};
export default QuizPage;