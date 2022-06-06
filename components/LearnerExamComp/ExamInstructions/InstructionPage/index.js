import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import LabeledRadioCheckbox from '../../../common/FormComponents/LabeledRadioCheckbox';
import QuizCorrectAnswer from '../../../examComps/QuizOptionInput/QuizCheckBox';
import styles from '../../learnerExam.module.scss';
import { data } from '../Logic/examInstruction.helper';

const InstructionPage = ({ setIsLearner, type, isFullScreen, setIsFullScreen }) => {
  const [isType, setIsType] = useState({
    schedule: true,
    takeAnyTime: true
  });
  const [terms, setTerms] = useState(false);
  useEffect(() => {
    if (type === 'Take Anytime') {
      setIsType((prevValue) => ({ ...prevValue, takeAnyTime: !prevValue.takeAnyTime }));
    }
  }, []);

  const router = useRouter();
  const examInstructionContainer = useRef(null);
  /* View in fullscreen */
  function openFullscreen(elem) {
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  // fix fullscreen issue
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // videoContainer.current?.requestFullscreen();
      openFullscreen(examInstructionContainer.current);
      setIsFullScreen(1);
    } else {
      // document.exitFullscreen();
      setIsFullScreen(0);
      closeFullscreen();
    }

    // setPlayPauseActivated(!document.fullscreenElement ? 'enterFullScreen' : 'exitFullScreen');
  }
  return (
    <div className={isFullScreen ? `${styles.fsContainer}` : ''} ref={examInstructionContainer}>
      <div className={`${styles.examInstContainer}`}>
        <div
          className={
            isFullScreen ? `${styles.examtitle} ${styles.examtitleFs}` : `${styles.examtitle}`
          }>
          {data.title}
        </div>
        <div className={`${styles.aboutExam}`}>
          <div className={`${styles.leftAbout}`}>
            <span>
              <img src="./images/ExamInstructions/assignment.png" alt="cannot found" /> Exam Type
              <span>:</span> <span>{data.examType}</span>
            </span>
            {isType.takeAnyTime && (
              <span>
                <img src="./images/ExamInstructions/schedule.png" alt="cannot found" /> Exam Start
                Time<span>:</span> <span>{data.examStartTime}</span>
              </span>
            )}
            <span>
              <img src="./images/ExamInstructions/hourglass_empty.png" alt="cannot found" /> Exam
              Duration<span>:</span> <span>{data.examDuration}</span>
            </span>
            {isType.takeAnyTime && (
              <span>
                <img src="./images/ExamInstructions/event.png" alt="cannot found" /> End date
                <span>:</span>
                <span>{data.examDate}</span>
              </span>
            )}
          </div>
          <div className={`${styles.rightAbout}`}>
            <span>
              <img src="./images/ExamInstructions/checklist_rtl.png" alt="cannot found" /> Total
              questions<span>:</span> <span>{data.examNQuestions}</span>
            </span>
            <span>
              <img src="./images/ExamInstructions/percent.png" alt="cannot found" /> Passing
              criteria
              <span>:</span> <span>{data.examPassingCriteria}</span>
            </span>
            {isType.takeAnyTime && (
              <span>
                <img src="./images/ExamInstructions/timer.png" alt="cannot found" /> Exam end time
                <span>:</span> <span>{data.examEndTime}</span>
              </span>
            )}
            {isType.takeAnyTime && (
              <span>
                <img src="./images/ExamInstructions/event.png" alt="cannot found" /> Exam Date
                <span>:</span> <span>{data.examDate}</span>
              </span>
            )}
            {isType.takeAnyTime && (
              <span>
                <img src="./images/ExamInstructions/language.png" alt="cannot found" /> Time
                Standard
                <span>:</span> <span>{data.examTimeStandard}</span>
              </span>
            )}
          </div>

          <div className={`${styles.rightAbout}`}>
            {isType.takeAnyTime && (
              <span>
                <img src="./images/ExamInstructions/rotate_right.png" alt="cannot found" /> Buffer
                Time<span>:</span> <span>{data.examBufferTime}</span>
              </span>
            )}

            <span>
              <img src="./images/ExamInstructions/calculate.png" alt="cannot found" /> Total marks
              <span>:</span> <span>{data.examTotalMarks}</span>
            </span>
            <span>
              <img src="./images/ExamInstructions/account_box.png" alt="cannot found" /> Proctored
              <span>:</span> <span>{data.examProctored}</span>
            </span>
            <span>
              <img src="./images/ExamInstructions/checklist_rtl.png" alt="cannot found" /> Max
              attempts<span>:</span> <span>{data.examMaxAttempt}</span>
            </span>
            <span>
              <img src="./images/ExamInstructions/checklist.png" alt="cannot found" /> Attempts
              <span>:</span> <span>{data.examAttempt}</span>
            </span>
          </div>
        </div>
        <div className={`${styles.viewHistory}`}>
          <a>View Attempt History</a>
        </div>
        <div
          className={
            isFullScreen
              ? `${styles.instructions} ${styles.instructionsFs}`
              : `${styles.instructions}`
          }>
          <div className={`${styles.genInfo}`}>
            <span>
              A. General Information<span>:</span>
            </span>
            <ol>
              <li>
                The examination will comprise of Objective type Multiple Choice Questions (MCQs)
              </li>
              <li>All questions are compulsory and each carries One mark.</li>
              <li>
                The total number of questions, duration of examination, will be different based on
                the course, the detail is available on your screen.
              </li>
              <li>The Subjects or topics covered in the exam will be as per the Syllabus.</li>
              <li>There will be NO NEGATIVE MARKING for the wrong answers.</li>
            </ol>
          </div>
          <div className={`${styles.genInfo}`}>
            <span>
              B. Information & Instructions<span>:</span>
            </span>
            <ol>
              <li>The examination does not require using any paper, pen, pencil and calculator.</li>
              <li>Every student will take the examination on a Laptop/Desktop/Smart Phone.</li>
              <li>
                On computer screen every student will be given objective type type Multiple Choice
                Questions (MCQs).
              </li>
              <li>
                Each student will get questions and answers in different order selected randomly
                from a fixed Question Databank.
              </li>
              <li>
                The students just need to click on the Right Choice / Correct option from the
                multiple choices /options given with each question.
              </li>
              <span>
                For Multiple Choice Questions, each question has four options, and the candidate has
                to click the appropriate option.
              </span>
            </ol>
          </div>
        </div>
        <div className={`${styles.instructionFooter}`}>
          <div className={`${styles.fsBtn}`}>
            <button onClick={toggleFullScreen}>
              {isFullScreen ? (
                <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
              ) : (
                <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
              )}
              {/* <Image src="/images/svg/fullscreen.svg" height={30} width={30} /> */}
            </button>
            <button onClick={() => router.back()}>
              <Image src="/images/svg/clear.svg" height={30} width={30} />
            </button>
          </div>
          <div className={`${styles.agreeText}`}>
            <LabeledRadioCheckbox 
            label="I have read and understood all the instructions given above and agree to adhere to them." 
            type="checkbox" 
            changeHandler={()=>setTerms(!terms)}
            />
          </div>

          <div className={`${styles.btn}`}>
            <button
              onClick={() => {
                setIsLearner(1);
              }}
              disabled={!terms}>
              Start
            </button>
            <button onClick={() => router.back()}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
