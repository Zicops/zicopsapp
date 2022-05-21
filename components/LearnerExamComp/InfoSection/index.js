import { useEffect, useState } from 'react';
import TimerDropdown from '../TimerDropdown';
import styles from'./infoSection.module.scss'
import {useRouter} from "next/router";

const InfoSection = ({data, setFilter}) => {

    const Router = useRouter()
   
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false ,second:'2-digit'});
    const[currentTime,setCurrentTime] = useState(time)

    const attemptedQuestions = () => {
        let attempted = 0;
        for(let i = 0; i < data.length; i++)
            if(data[i].selectedOption)
                attempted++;
        return attempted + '/' + data.length;
    }


    const handleEndButton = async () => {
        const result = JSON.stringify(data);
        localStorage.setItem('exam/1', result)
        await Router.push('/exam-result')
    }

  return (
    <div className={`${styles.info_section}`}>
      <div className={`${styles.info_section_button_boxes_container}`}>
        <section>
          <button onClick={() => {setFilter('attempted')}} className={`${styles.info_button}`}>
            <div className={`${styles.info_button_boxes} ${styles.info_button_boxes_attempted}`}></div>
            Attempted
          </button>
          <button onClick={() => {setFilter('marked')}} className={`${styles.info_button}`}>
            <div className={`${styles.info_button_boxes} ${styles.info_button_boxes_marked}`}></div>
            Marked
          </button>
        </section>
          <section>
              <button onClick={() => {setFilter('unattempted')}} className={`${styles.info_button}`}>
                  <div className={`${styles.info_button_boxes} ${styles.info_button_boxes_unattempted}`}></div>
                  Unattempted
              </button>
              <button onClick={() => {setFilter('unvisited')}}  className={`${styles.info_button}`}>
                  <div className={`${styles.info_button_boxes} ${styles.info_button_boxes_unvisited}`}></div>
                  Not Visited
              </button>
          </section>
      </div>
        <div className={`${styles.info_section_seeAll_button_container}`}>
            <button onClick={() => {setFilter('all')}}  className={`${styles.info_section_seeAll_button}`}>See All</button>
        </div>
      <div className={`${styles.info_section_answer_details}`}>
          <p>You have attempted</p>
          <span className={`${styles.info_section_answer_details_marks}`}>{attemptedQuestions()}</span>
          <p>Questions</p>
      </div>
      <div className={`${styles.info_section_exam_info_button_container}`}>
          <button className={`${styles.info_section_exam_info_button} ${styles.info_section_exam_info_button_question}`}>Question Paper</button>
          <button onClick={handleEndButton} className={`${styles.info_section_exam_info_button} ${styles.info_section_exam_info_button_exam}`}>End Exam</button>
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
