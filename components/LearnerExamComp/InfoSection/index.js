import { useEffect, useState } from 'react';
import TimerDropdown from '../TimerDropdown';
import styles from'./infoSection.module.scss'

const InfoSection = ({ ShowQuestions, setShowQuestions }) => {

  const setShowQuestionButton = () => {
    setShowQuestions(!ShowQuestions);
  }
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    second: '2-digit'
  });
  const [currentTime, setCurrentTime] = useState(time);

  console.log(currentTime);

  return (
    <div className={`${styles.info_section}`}>
      <div className={`${styles.info_section_button_boxes_container}`}>
        <section>
          <button className={`${styles.info_button}`}>
            <div className={`${styles.info_button_boxes}`}></div>
            Attempted
          </button>
          <button className={`${styles.info_button}`}>
            <div className={`${styles.info_button_boxes} ${styles.info_button_boxes_marked}`}></div>
            Marked
          </button>
          <button className={`${styles.info_button}`}>
            <div
              className={`${styles.info_button_boxes} ${styles.info_button_boxes_unattempted}`}></div>
            Unattempted
          </button>
        </section>
        <section>
          <button className={`${styles.info_section_seeAll_button}`}>See All</button>
        </section>
      </div>
      <div className={`${styles.info_section_answer_details}`}>
        <p>You have attempted</p>
        <span className={`${styles.info_section_answer_details_marks}`}>13/30</span>
        <p>Questions</p>
      </div>
      <div className={`${styles.info_section_exam_info_button_container}`}>
        <button
          onClick={setShowQuestionButton}
          className={`${styles.info_section_exam_info_button} ${styles.info_section_exam_info_button_question}`}>
          {!ShowQuestions ? 'Question Paper' : 'Back to Exam'}
        </button>
        <button
          className={`${styles.info_section_exam_info_button} ${styles.info_section_exam_info_button_exam}`}>
          End Exam
        </button>
      </div>
      <div className={`${styles.info_section_watch}`}>
        {/* <div className={`${styles.info_section_time}`}> */}
        <TimerDropdown />
        <span className={`${styles.info_section_watch_time}`}>{currentTime}</span>
        {/* </div> */}
      </div>
    </div>
  );
};

export default InfoSection;
