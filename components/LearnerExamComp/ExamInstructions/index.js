import CheckBoxField from '../../common/CheckBoxField';
import QuizCorrectAnswer from '../../examComps/QuizOptionInput/QuizCheckBox';
import styles from '../learnerExam.module.scss';
import { data } from './Logic/examInstruction.helper';

const ExamInstruction = () => {
  return (
    <div className={`${styles.examInstContainer}`}>
      <div className={`${styles.examtitle}`}>{data.title}</div>
      <div className={`${styles.aboutExam}`}>
        <div className={`${styles.leftAbout}`}>
          <span>
            <img src="./images/ExamInstructions/assignment.png" alt="cannot found" /> Exam Type:{' '}
            <span>{data.examType}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/schedule.png" alt="cannot found" /> Exam Start Time:{' '}
            <span>{data.examStartTime}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/hourglass_empty.png" alt="cannot found" /> Exam
            Duration: <span>{data.examDuration}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/event.png" alt="cannot found" /> End date:
            <span>{data.examDate}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/checklist_rtl.png" alt="cannot found" /> Total
            questions: <span>{data.examNQuestions}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/percent.png" alt="cannot found" /> Passing criteria:{' '}
            <span>{data.examPassingCriteria}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/checklist_rtl.png" alt="cannot found" /> Max
            attempts: <span>{data.examMaxAttempt}</span>
          </span>
        </div>
        <div className={`${styles.rightAbout}`}>
          <span>
            <img src="./images/ExamInstructions/event.png" alt="cannot found" /> Exam Date:{' '}
            <span>{data.examDate}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/language.png" alt="cannot found" /> Time Standard:{' '}
            <span>{data.examTimeStandard}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/rotate_right.png" alt="cannot found" /> Buffer Time:{' '}
            <span>{data.examBufferTime}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/timer.png" alt="cannot found" /> Exam end time:{' '}
            <span>{data.examEndTime}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/calculate.png" alt="cannot found" /> Total marks:{' '}
            <span>{data.examTotalMarks}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/account_box.png" alt="cannot found" /> Proctored:{' '}
            <span>{data.examProctored}</span>
          </span>
          <span>
            <img src="./images/ExamInstructions/checklist.png" alt="cannot found" /> Attempts:{' '}
            <span>{data.examAttempt}</span>
          </span>
        </div>
      </div>
      <div className={`${styles.viewHistory}`}>
        <a>View Attempt History</a>
      </div>
      <div className={`${styles.instructions}`}>
        <div className={`${styles.genInfo}`}>
          <span>A. General Information:</span>
          <ol>
            <li>
              The examination will comprise of Objective type Multiple Choice Questions (MCQs)
            </li>
            <li>All questions are compulsory and each carries One mark.</li>
            <li>
              The total number of questions, duration of examination, will be different based on the
              course, the detail is available on your screen.
            </li>
            <li>The Subjects or topics covered in the exam will be as per the Syllabus.</li>
            <li>There will be NO NEGATIVE MARKING for the wrong answers.</li>
          </ol>
        </div>
        <div className={`${styles.genInfo}`}>
          <span>B. Information & Instructions:</span>
          <ol>
            <li>The examination does not require using any paper, pen, pencil and calculator.</li>
            <li>Every student will take the examination on a Laptop/Desktop/Smart Phone.</li>
            <li>
              On computer screen every student will be given objective type type Multiple Choice
              Questions (MCQs).
            </li>
            <li>
              Each student will get questions and answers in different order selected randomly from
              a fixed Question Databank.
            </li>
            <li>
              The students just need to click on the Right Choice / Correct option from the multiple
              choices /options given with each question.
            </li>
            <span>
              For Multiple Choice Questions, each question has four options, and the candidate has
              to click the appropriate option.
            </span>
          </ol>
        </div>

        <div className={`${styles.instructionFooter}`}>
          <QuizCorrectAnswer
            labelText={
              'I have read and understood all the instructions given above and agree to adhere to them'
            }
          />
          <div className={`${styles.btn}`}>
            <button>Start</button>
            <button>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInstruction;
