import React, { useEffect, useState } from 'react';
import styles from './examHeroSecion.module.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ExamPopUp from './ExamPopUp';
import { useLazyQuery } from '@apollo/client';
import { GET_LATEST_EXAMS, queryClient } from '@/api/Queries';
import { useExamData } from "./helper";
import { useRouter } from 'next/router';
const ExamHeroSection = () => {
  const router = useRouter()
  const [isScheduleActive, setIsScheduleActive] = useState(false);
  const [isAnytimeActive, setIsAnytimeActive] = useState(false);
  const [isCompletedActive, setIsCompletedActive] = useState(false);
  const [openModalScheduled, setModalScheduled] = useState(false);
  const [openModalAnyTime, setModalAnyTime] = useState(false);
  const [openModalCompleted, setModalCompleted] = useState(false);
  const [scheduleExamData, setScheduleExamData] = useState([])
  const [antTimeExamData, setAntTimeExamData] = useState([])
  const [completedExamData, setCompletedExamData] = useState([])
  const {loadExamData} = useExamData()
  const onClosePopUpScheduled = () => {
  setModalScheduled(false);
 }
  const onClosePopUpAnyTime = () => {
   setModalAnyTime(false);
 }
  const onClosePopUpCompleted = () => {
   setModalCompleted(false);
 }
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
    setModalCompleted(true);
  };
  const [loadExams, { error: loadExamErr }] = useLazyQuery(GET_LATEST_EXAMS, {
    client: queryClient
  });
  useEffect(async() => {
  // const queryVariables = {
  //     publish_time: Date.now(),
  //     pageSize: 9999999,
  //     pageCursor: '',
  //   };

//     const res = await loadExams({ variables: queryVariables });
//     if (loadExamErr) return setToastMsg({ type: 'danger', message: 'exams load error' });
//     if (!res.data?.getLatestExams?.exams) return;

//     const loadedExams = res.data.getLatestExams.exams || [];
//     console.log("loadedExams", loadedExams);
//     const scheduleExam = loadedExams?.filter((exam) => exam?.ScheduleType === 'scheduled')
//     console.log(scheduleExam);
//     setScheduleExamData(scheduleExam)
//     const anyTimeExam = loadedExams?.filter((exam) => exam?.ScheduleType === 'anytime')
//     setAntTimeExamData(anyTimeExam)
//     const completedExam = loadedExams?.filter((exam) => exam?.ScheduleType === 'completed')
//     setCompletedExamData(completedExam)
//  console.log("scheduleExamData",scheduleExamData);
//  console.log("antTimeExamData",antTimeExamData);
//  console.log("completedExamData",completedExamData);
  }, [])
  useEffect(async () => {
    const examData = await loadExamData();
    setScheduleExamData(examData?.scheduleExams)
    setAntTimeExamData(examData?.takeAnyTimeExams)
    console.log(examData);
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
          <table className={`${styles.table}`}>
             <thead>
            <tr className={`${styles.tableHeader}`}>
              <th>Exam Name</th>
              <th>Course Name</th>
              <th>Exam Date</th>
            </tr>
            </thead>
            <tbody>
            {scheduleExamData?.map((exam , index) => (
              <tr key={index} onClick={() => {
                router?.push(
                            `/course/${exam?.courseId}?activateExam=${exam?.examId}`,
                            `/course/${exam?.courseId}`
                          );
            }}>
                <td>{exam?.examName}</td>
                <td>{exam?.courseName}</td>
                <td>{exam?.examDate} mins</td>
            </tr>
            ))}

            </tbody>
          </table>
        </ExamPopUp>
      </Popup>
      <Popup open={openModalAnyTime} closeOnDocumentClick={false} closeOnEscape={false}>
        <ExamPopUp title="Take Anytime Exams" closePopUp={onClosePopUpAnyTime} >
          <table className={`${styles.table}`}>
             <thead>
            <tr className={`${styles.tableHeader}`} >
              <th>Exam Name</th>
              <th>Course Name</th>
              <th>Duration</th>
            </tr>
            </thead>
            <tbody>
           {antTimeExamData?.map((exam , index) => (
            <tr key={index} onClick={() => {
                router?.push(
                            `/course/${exam?.courseId}?activateExam=${exam?.examId}`,
                            `/course/${exam?.courseId}`
                          );
            }}>
                <td>{exam?.Name}</td>
                <td>{exam?.courseName}</td>
                <td>{exam?.Duration} mins</td>
            </tr>
            ))}

            </tbody>
           
          </table>
        </ExamPopUp>
      </Popup>
      <Popup open={openModalCompleted} closeOnDocumentClick={false} closeOnEscape={false}>
        <ExamPopUp title="Completed Exams" closePopUp={onClosePopUpCompleted}>
          <table className={`${styles.table}`}>
            <thead>
            <tr className={`${styles.tableHeader}`}>
              <th>Exam Name</th>
              <th>Course Name</th>
              <th>Duration</th>
            </tr>
            </thead>
              {completedExamData?.map((exam , index) => (
            <tr key={index}>
                <td>{exam?.Name}</td>
                <td>{exam?.Category}</td>
                <td>{exam?.Duration} mins</td>
            </tr>
            ))}
          </table>
        </ExamPopUp>
      </Popup>
    </div>
  );
};

export default ExamHeroSection;
