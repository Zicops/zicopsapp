import React, { useEffect, useState } from 'react';
import styles from './examHeroSecion.module.scss';
import Popup from 'reactjs-popup';
import ExamPopUp from './ExamPopUp';
import { useExamData } from "./helper";
import { useRouter } from 'next/router';
import Loader from '@/components/common/Loader';
const ExamHeroSection = ({simpleTableRef}) => {
  const router = useRouter()
  const [isScheduleActive, setIsScheduleActive] = useState(false);
  const [isAnytimeActive, setIsAnytimeActive] = useState(false);
  const [isCompletedActive, setIsCompletedActive] = useState(false);
  const [openModalScheduled, setModalScheduled] = useState(false);
  const [openModalAnyTime, setModalAnyTime] = useState(false);
  // const [openModalCompleted, setModalCompleted] = useState(false);
  const [scheduleExamData, setScheduleExamData] = useState([])
  const [antTimeExamData, setAntTimeExamData] = useState([])
  // const [completedExamData, setCompletedExamData] = useState([])
 const [loading, setLoading] = useState(false);
  const { loadExamData } = useExamData()
  const onClosePopUpScheduled = () => {
  setModalScheduled(false);
 }
  const onClosePopUpAnyTime = () => {
   setModalAnyTime(false);
 }
//   const onClosePopUpCompleted = () => {
//    setModalCompleted(false);
//  }
  const onScheduledHandler = () => {
    setIsScheduleActive(true);
    setIsAnytimeActive(false);
    setIsCompletedActive(false);
   setModalScheduled(true)
  };
  const onAnytimeHandler = () => {
    setIsScheduleActive(false);
    setIsAnytimeActive(true);
    setIsCompletedActive(false);
     setModalAnyTime(true);
  };
  const onCompletedHandler = () => {
    setIsScheduleActive(false);
    setIsAnytimeActive(false);
    setIsCompletedActive(true);
    const y = simpleTableRef.current.offsetTop - 100;
    window?.scrollTo({ top: y, behavior: 'smooth' });
  };


  useEffect(async () => {
     setLoading(true)
    const examData = await loadExamData();
    setScheduleExamData(examData?.scheduleExams)
    setAntTimeExamData(examData?.takeAnyTimeExams)
    setLoading(false)
  },[])
  
  return (
    <div className={`${styles.heroContainer}`}>
      {/* <img src="/images/svg/Group 100.svg" alt="" className={`${styles.image1}`} />
      <img src="/images/svg/Layer_1-2.svg" alt="" className={`${styles.image3}`} />
      <img src="/images/svg/Ellipse 23.svg" alt="" className={`${styles.image4}`} />
      <img src="/images/svg/Ellipse 24.svg" alt="" className={`${styles.image5}`} /> */}
      <div className={`${styles.heroBody}`}>
        <div className={`${styles.textConatiner}`}>
        <h2>
          Check Out <br /> Your <span>Exams</span>
        </h2>
        <img src="/images/svg/Group 101.svg" alt="" className={`${styles.paperPlane}`} />
        </div>
        <div className={`${styles.buttonContainer}`}>
          <button
            className={`${isScheduleActive ? styles.btnActive : ''}`}
            onClick={onScheduledHandler}>
            Scheduled Exams
          </button>
          <button
            className={`${isAnytimeActive ? styles.btnActive : ''}`}
            onClick={onAnytimeHandler}>
            Take Anytime Exams
          </button>
          <button
            className={`${isCompletedActive ? styles.btnActive : ''}`}
            onClick={onCompletedHandler}>
            Completed Exams
          </button>
        </div>
      </div>
      <Popup open={openModalScheduled} closeOnDocumentClick={false} closeOnEscape={false}>
        <ExamPopUp title="Scheduled Exams" closePopUp={onClosePopUpScheduled}>
          {loading ? <Loader customStyles={{ height: '100%', backgroundColor: 'transparent' }}/> :
            <table className={`${styles.table}`}>
              <thead>
                <tr className={`${styles.tableHeader}`}>
                  <th>Exam Name</th>
                  <th>Course Name</th>
                  <th>Exam Date</th>
                </tr>
              </thead>
              {scheduleExamData?.length ?
                (<tbody>
                  {scheduleExamData?.map((exam, index) => (
                    <tr key={index} onClick={() => {
                      router?.push(
                        `/course/${exam?.courseId}?activateExam=${exam?.examId}`,
                        `/course/${exam?.courseId}`
                      );
                    }}>
                      <td>{exam?.examName}</td>
                      <td>{exam?.courseName}</td>
                      <td>{exam?.examDate}</td>
                    </tr>
                  ))}
                </tbody>)
                :
                <tbody>
                  <td></td>
                  <td> No Exams Found</td>
                </tbody>
              }
            </table>
          }
        </ExamPopUp>
      </Popup>
      <Popup open={openModalAnyTime} closeOnDocumentClick={false} closeOnEscape={false}>
        <ExamPopUp title="Take Anytime Exams" closePopUp={onClosePopUpAnyTime} >
          {loading ? <Loader customStyles={{ height: '100%', backgroundColor: 'transparent' }}/> :
            <table className={`${styles.table}`}>
            <thead>
              <tr className={`${styles.tableHeader}`} >
                <th>Exam Name</th>
                <th>Course Name</th>
                <th>Duration</th>
              </tr>
            </thead>
            {antTimeExamData?.length ?
              <tbody>
                {antTimeExamData?.map((exam, index) => (
                  <tr key={index} onClick={() => {
                    router?.push(
                      `/course/${exam?.courseId}?activateExam=${exam?.examId}`,
                      `/course/${exam?.courseId}`
                    );
                  }}>
                    <td>{exam?.Name}</td>
                    <td>{exam?.courseName}</td>
                    <td>{exam?.Duration / 60} mins</td>
                  </tr>
                ))}
              </tbody>
              :
              <tbody>
                <td></td>
                <td>No Exams Found</td>
              </tbody>
            }
          </table>
          }
        </ExamPopUp>
      </Popup>
    </div>
  );
};

export default ExamHeroSection;
