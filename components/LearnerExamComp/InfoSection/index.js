import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTION_OPTIONS_WITH_ANSWER, queryClient } from 'API/Queries';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Timer from '../Timer';
import styles from './infoSection.module.scss';

const InfoSection = ({ handleEndButton, data, setIsQuestion, setFilter }) => {
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(
    GET_QUESTION_OPTIONS_WITH_ANSWER,
    { client: queryClient }
  );
  const router = useRouter();
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  const [isShowTimeLeft, setIsShowTimeLeft] = useState(1);

  const attemptedQuestions = () => {
    let attempted = 0;
    for (let i = 0; i < data.length; i++) if (data[i].selectedOption) attempted++;
    return attempted + '/' + data.length;
  };

  return (
    <div className={`${styles.info_section}`}>
      <div className={`${styles.info_section_button_boxes_container}`}>
        <section>
          <button
            onClick={() => {
              setFilter('attempted');
            }}
            className={`${styles.info_button}`}>
            <div
              className={`${styles.info_button_boxes} ${styles.info_button_boxes_attempted}`}></div>
            Attempted
          </button>
          <button
            onClick={() => {
              setFilter('marked');
            }}
            className={`${styles.info_button}`}>
            <div className={`${styles.info_button_boxes} ${styles.info_button_boxes_marked}`}></div>
            Marked
          </button>
        </section>
        <section>
          <button
            onClick={() => {
              setFilter('unattempted');
            }}
            className={`${styles.info_button}`}>
            <div
              className={`${styles.info_button_boxes} ${styles.info_button_boxes_unattempted}`}></div>
            Unattempted
          </button>
          <button
            onClick={() => {
              setFilter('unvisited');
            }}
            className={`${styles.info_button}`}>
            <div
              className={`${styles.info_button_boxes} ${styles.info_button_boxes_unvisited}`}></div>
            Not Visited
          </button>
        </section>
      </div>
      <div className={`${styles.info_section_seeAll_button_container}`}>
        <button
          onClick={() => {
            setFilter('all');
          }}
          className={`${styles.info_section_seeAll_button}`}>
          See All
        </button>
      </div>
      <div className={`${styles.info_section_answer_details}`}>
        <p>You have attempted</p>
        <span className={`${styles.info_section_answer_details_marks}`}>
          {attemptedQuestions()}
        </span>
        <p>Questions</p>
      </div>
      <div className={`${styles.info_section_exam_info_button_container}`}>
        <button
          onClick={() => setIsQuestion(true)}
          className={`${styles.info_section_exam_info_button} ${styles.info_section_exam_info_button_question}`}>
          Question Paper
        </button>
        <button
          onClick={handleEndButton}
          className={`${styles.info_section_exam_info_button} ${styles.info_section_exam_info_button_exam}`}>
          End Exam
        </button>
      </div>
      <div className={`${styles.info_section_watch}`}>
        <Timer isShowTimeLeft={isShowTimeLeft} setIsShowTimeLeft={setIsShowTimeLeft} />
      </div>
    </div>
  );
};

export default InfoSection;
