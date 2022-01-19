import QuizLoop from '../small/QuizLoop';
import QuizAdded from '../small/QuizAdded';
import IconButton from '../small/IconButton'
import styles from '../../styles/CourseMaster.module.css';

const Quiz = () => {
    return (
        <>
            <QuizAdded index="Quiz 1" text="Stop Screen Quiz" type="MCQ"/>
            <QuizAdded index="Quiz 2" text="Ending Quiz" type="MCQ"/>
            <div className={styles.row}>
                <div className={styles.chapter_section}>
                    <div className={styles.radio_btn}>
                        <input type="checkbox" name="chapter-radio" id="chapter-radio" />
                    </div>
                    <div className={styles.chapter}>
                        <div className={styles.chapter_head}>
                            Stop Screen (Mandatory Quiz)
                        </div>
                        <div className={styles.chapter_desc}>
                            This functionality if checked will not allow learner to skip quiz or auto skip will be disabled.
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.form_row}>
                <label htmlFor="name" className={styles.col_25}>Quiz Name</label>
                <input type="text" autoComplete="name" id="name" placeholder="Enter a quiz name" className={styles.col_75} required />
            </div>
            
            <div className={styles.row}>
                <div className={styles.col_10}>
                    <label className={styles.checkbox_container}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>Beginner
                    </label>
                </div>
                <div className={styles.col_10}>
                    <label className={styles.checkbox_container}>
                        <input type="checkbox" />
                        <span className={styles.checkmark}></span>Competent
                    </label>
                </div>
            </div>

            <div className={styles.form_row}>
                <select >
                    <option>Select Quiz Type</option>
                </select>
            </div>
            
                <QuizLoop type="question" sr="Q" text="Is this a question?"/>
                <QuizLoop type="answer" sr="O1" text="This is option 1."/>
                <QuizLoop type="answer" sr="O2" text="This is option 2"/>
                <QuizLoop type="answer" sr="O3" text="This is option 3"/>
                <QuizLoop type="answer" sr="O4" text="This is option 4"/>
            <div className={styles.row}>
                <IconButton styleClass="grey" text="Add Quiz"/>
            </div>
            <div className={styles.row}>
                <IconButton styleClass="lightblack" text="Add Exercise"/>
            </div>
            <div className={styles.row}>
                <IconButton styleClass="black" text="Add Resources"/>
            </div>
        </>
    )
}
            
export default Quiz