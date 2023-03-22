import styles from "../vctoolMain.module.scss"
const CreateQuiz = ({addQuiz}) => {
    return (
        <div className={`${styles.moderatorQuize}`}>

            <div className={`${styles.quizModeratorScreen}`}>
                <div className={`${styles.moderatorAddQuiz}`}>
                    <div className={styles.quizIcon}><img src='/images/svg/vctool/quiz.svg' /></div>
                    <div className={`${styles.quizAvailableHead}`}>No quizzes available!</div>
                    <p className={`${styles.quizAvailablesubHead}`}>Click bellow to add quizzes</p>
                </div>
            </div>
            <button className={`${styles.addQuizBtn}`} onClick={() => {
                addQuiz()
            }}><div>+</div>Add Quiz</button>
        </div>
    )
};
export default CreateQuiz;