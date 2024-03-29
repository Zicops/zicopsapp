import AttempHistory from '@/components/AttemptHistory';
import RTE from '@/components/common/FormComponents/RTE';
import ToolTip from '@/components/common/ToolTip';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LearnerExamAtom } from '../../../../state/atoms/exams.atoms';
import LabeledRadioCheckbox from '../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../../learnerExam.module.scss';
import { data, getIsExamAccessible } from '../../Logic/exam.helper';
import { passingCriteriaSymbol } from '../Logic/examInstruction.helper';

const InstructionPage = ({
  handleStart,
  isFullScreen,
  isSampleTest = false,
  isTestExam,
  handleBackBtn = () => {}
}) => {
  let learnerExamData = useRecoilValue(LearnerExamAtom);
  const userCourseData = useRecoilValue(UserCourseDataAtom);

  if (!learnerExamData?.examData?.id) {
    const _d = data;
    _d.examData.examStart = new Date(moment().subtract('15', 'minutes').seconds(0));
    _d.examData.examEnd = new Date(
      moment()
        .add(_d.examData.duration + _d.examData.bufferTime, 'minutes')
        .seconds(0)
    );
    learnerExamData = data;
  }

  const [isType, setIsType] = useState({
    schedule: true,
    takeAnyTime: true
  });
  const [terms, setTerms] = useState(false);
  const [isExamAccessible, setIsExamAccessible] = useState(null);
  const [isAttemptHistoryOpen, setIsAttempyHistoryOpen] = useState(null);
  const router = useRouter();
  const topicId = router?.query?.topicId;

  useEffect(() => {
    if (learnerExamData?.examData?.scheduleType === 'Take Anytime') {
      setIsType((prevValue) => ({ ...prevValue, takeAnyTime: !prevValue.takeAnyTime }));
    }
  }, []);

  let timer = null;
  useEffect(() => {
    clearTimeout(timer);
    const isAccessible = getIsExamAccessible(learnerExamData);
    if (isTestExam) return setIsExamAccessible(terms && isAccessible);

    const attemptsLeft = learnerExamData?.examData?.noAttempts;
    let isAttemptLeft = true;
    if (attemptsLeft > 0) isAttemptLeft = learnerExamData?.insPageData?.attempts < attemptsLeft;

    setIsExamAccessible(terms && isAccessible && isAttemptLeft);

    if (!(terms && isAccessible && isAttemptLeft)) {
      const timeLeft = learnerExamData?.examData.examStart?.valueOf() - Date.now();
      if (timeLeft < 0) return;
      timer = setTimeout(() => {
        setTerms((prev) => (prev === true ? 1 : prev));
      }, timeLeft);
    }
    return () => clearTimeout(timer);
  }, [terms]);

  return (
    <div className={`${styles.examInstContainer}`}>
      <div
        className={
          isFullScreen ? `${styles.examtitle} ${styles.examtitleFs}` : `${styles.examtitle}`
        }>
        {learnerExamData?.examData?.name}
      </div>
      <div className={`${styles.aboutExam}`}>
        <div className={`${styles.leftAbout}`}>
          <span>
            <img src="/images/ExamInstructions/assignment.png" alt="" /> Exam Type
            <span>:</span>{' '}
            <span style={{ textTransform: 'capitalize' }}>
              {learnerExamData?.examData?.scheduleType}
            </span>
          </span>
          {isType.takeAnyTime && (
            <span>
              <img src="/images/ExamInstructions/schedule.png" alt="cannot found" /> Exam Start Time
              <span>:</span>{' '}
              <span>
                {learnerExamData?.examData?.examStart?.toLocaleTimeString
                  ? learnerExamData?.examData?.examStart?.toLocaleTimeString()
                  : 'N/A'}
              </span>
            </span>
          )}
          <span>
            <img src="/images/ExamInstructions/hourglass_empty.png" alt="cannot found" /> Exam
            Duration<span>:</span> <span>{learnerExamData?.examData?.duration || '0'} mins</span>
          </span>
          {isType.takeAnyTime && (
            <span>
              <img src="/images/ExamInstructions/event.png" alt="cannot found" /> End date
              <span>:</span>
              <span>
                {learnerExamData?.examData?.examEnd?.toDateString
                  ? learnerExamData?.examData?.examEnd?.toDateString()
                  : 'N/A'}
              </span>
            </span>
          )}
        </div>
        <div className={`${styles.rightAbout}`}>
          <span>
            <img src="/images/ExamInstructions/checklist_rtl.png" alt="cannot found" /> Total
            questions<span>:</span>{' '}
            <span>{learnerExamData?.landingPageData?.totalQuestions || 0}</span>
          </span>
          <span>
            <img src="/images/ExamInstructions/percent.png" alt="cannot found" /> Passing criteria
            <span>:</span>{' '}
            <span>
              {passingCriteriaSymbol(learnerExamData?.examData?.passingCriteria) || 'N/A'}
            </span>
          </span>
          {isType.takeAnyTime && (
            <span>
              <img src="/images/ExamInstructions/timer.png" alt="cannot found" /> Exam end time
              <span>:</span>
              <span>
                {learnerExamData?.examData?.examEnd?.toLocaleTimeString
                  ? learnerExamData?.examData?.examEnd?.toLocaleTimeString()
                  : 'N/A'}
              </span>
            </span>
          )}
          {isType.takeAnyTime && (
            <span>
              <img src="/images/ExamInstructions/event.png" alt="cannot found" /> Exam Date
              <span>:</span>{' '}
              <span>
                {!!learnerExamData?.examData?.examStart
                  ? moment(learnerExamData?.examData?.examStart).format('LL')
                  : 'N/A'}
              </span>
            </span>
          )}
          {isType.takeAnyTime && (
            <span>
              <img src="/images/ExamInstructions/language.png" alt="cannot found" /> Time Standard
              <span>:</span> <span>{learnerExamData?.insPageData?.examTimeStandard}</span>
            </span>
          )}
        </div>

        <div className={`${styles.rightAbout}`}>
          {isType.takeAnyTime && (
            <span>
              <img src="/images/ExamInstructions/rotate_right.png" alt="cannot found" /> Buffer Time
              <span>:</span> <span>{learnerExamData?.examData?.bufferTime || 0} mins</span>
            </span>
          )}

          <span>
            <img src="/images/ExamInstructions/calculate.png" alt="cannot found" /> Total marks
            <span>:</span> <span>{learnerExamData?.examData?.totalMarks || 0}</span>
          </span>
          <span>
            <img src="/images/ExamInstructions/account_box.png" alt="cannot found" /> Proctored
            <span>:</span> <span>{learnerExamData?.landingPageData?.isProctoring}</span>
          </span>
          <span>
            <img src="/images/ExamInstructions/checklist_rtl.png" alt="cannot found" /> Max attempts
            <span>:</span>{' '}
            <span>
              {learnerExamData?.examData?.noAttempts > 0
                ? learnerExamData?.examData?.noAttempts
                : 'Unlimited'}{' '}
              Attempts
            </span>
          </span>
          <span>
            <img src="/images/ExamInstructions/checklist.png" alt="cannot found" /> Attempts
            <span>:</span>{' '}
            <span>
              {learnerExamData?.insPageData?.attempts || 0}
              {learnerExamData?.examData?.noAttempts > 0
                ? `/ ${learnerExamData?.examData?.noAttempts}`
                : ''}
            </span>
          </span>
        </div>
      </div>
      <div className={`${styles.viewHistory} ${isSampleTest ? styles.disabled : ''}`}>
        <ToolTip title="Check previous attempts" placement="right">
          <a onClick={() => !isSampleTest && setIsAttempyHistoryOpen(true)}>View Attempt History</a>
        </ToolTip>
      </div>
      <div
        className={
          isFullScreen
            ? `${styles.instructions} ${styles.instructionsFs}`
            : `${styles.instructions}`
        }>
        {/* <div dangerouslySetInnerHTML={{ __html: learnerExamData?.examData?.instructions }}></div> */}
        {/* {learnerExamData?.examData?.instructions} */}
        {!learnerExamData?.examData?.id ? (
          <>
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
                <li>
                  The examination does not require using any paper, pen, pencil and calculator.
                </li>
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
                  For Multiple Choice Questions, each question has four options, and the candidate
                  has to click the appropriate option.
                </span>
              </ol>
            </div>
          </>
        ) : (
          <RTE
            isReadOnly={true}
            // customStyles={{ background: 'var(--black)' }}
            value={learnerExamData?.examData?.instructions}
          />
        )}
      </div>
      <div className={`${styles.instructionFooter}`}>
        <div>
          {/*  <button onClick={toggleFullScreen}>
              {isFullScreen ? (
                <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
              ) : (
                <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
              )}
            </button>
            <button onClick={() => router.back()}>
              <Image src="/images/svg/clear.svg" height={30} width={30} />
            </button> */}
        </div>
        <div className={`${styles.agreeText}`}>
          <LabeledRadioCheckbox
            label={
              <ToolTip title="Click to accept and proceed" placement="right">
                <span>
                  I have read and understood all the instructions given above and agree to adhere to
                  them.
                </span>
              </ToolTip>
            }
            type="checkbox"
            changeHandler={() => setTerms(!terms)}
          />
        </div>

        <div className={`${styles.btn}`}>
          <ToolTip title="Start exam now" placement="left">
            <button onClick={handleStart} disabled={!isExamAccessible}>
              Start
            </button>
          </ToolTip>
          <ToolTip title="Cancel and go back to Main page" placement="left">
            <button onClick={handleBackBtn}>Back</button>
          </ToolTip>
        </div>
      </div>

      {isAttemptHistoryOpen && (
        <AttempHistory
          examId={learnerExamData?.examData?.id}
          userCourseProgressId={
            userCourseData?.userCourseProgress?.find((cp) => cp?.topic_id === topicId)?.user_cp_id
          }
          handleClose={() => setIsAttempyHistoryOpen(false)}
        />
      )}
    </div>
  );
};

export default InstructionPage;
