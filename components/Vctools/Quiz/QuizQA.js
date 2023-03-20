import styles from "../vctoolMain.module.scss";
const QuizQA = () => {
    const difficultyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className={`${styles.quizQAcontainer}`}>
            <div className={`${styles.quizeQALabel}`}>Create Quiz</div>
            <div className={`${styles.quizQuestionBox}`}>
                <div className={`${styles.quizName}`}>
                    <div>Quiz name:</div>
                    <input type="text" placeholder="Enter quiz name" />
                </div>
                <div className={`${styles.quizQuestion}`}>
                    <div className={`${styles.quizQA}`}>Question :</div>
                    <div className={`${styles.quizQuestionBoxs}`}>
                        <input type="text" placeholder="Enter question here" />
                        <img src="/images/svg/vctool/image.svg" />
                    </div>
                </div>
            </div>
            <div className={`${styles.quizDifficultyLevel}`}> Difficulty Level:</div>
            <div className={`${styles.quizeLevels}`}>
                {
                    difficultyLevels.map((data) => {
                        return <input value={data < 10 ? `0${data}` : data} type="button" />
                    })
                }
            </div>

            <div className={`${styles.quizOptionsLabel}`}>Options</div>
            <p className={`${styles.quizOptionNotice}`}>*please select the correct option</p>
            
        </div>
    )
};
export default QuizQA;