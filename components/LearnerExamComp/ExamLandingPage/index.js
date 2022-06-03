import { useRouter } from 'next/router';
import styles from './examLanding.module.scss';

const ExamLandingPage = () => {
  const data = [
    {
      testSeries: 'PMP Test Series',
      testDescription: 'M1A4 : PMP Practice Test II',
      testNumber:'PMP Practice Test II',
      schedule: '25 March, 2022',
      isScheduled:'Scheduled',
      time: '3 PM IST(Indian Standard Time)',
      expertiseLevel: 'Beginners',
      proctoring: 'Yes',
      duration: '2 Hrs',
      totalQuestions: 120,
      negativeMarking: 'No',
      numberOfAttempts: 1
    }
  ];
  const router = useRouter(0)
  return (
    <div className={`${styles.exam_landing}`}>
      <div className={`${styles.exam_landing_head}`}>
        <button className={`${styles.exam_landing_head_btn}`} onClick={() => router.back()}>
          <img src="./images/Back.png" />
        </button>
        <div className={`${styles.exam_landing_head_container}`}>
          <p id={`${styles.exam_landing_head_testSeries}`}>{data[0].testSeries}</p>
          <p id={`${styles.exam_landing_head_testDescription}`}>{data[0].testDescription}</p>
        </div>
      </div>
      <div className={`${styles.exam_landing_info}`}>
        <p id={`${styles.exam_landing_info_testSeries}`}>{data[0].testNumber}</p>
        <span id={`${styles.exam_landing_info_testInfo}`}>
          This is a fixed date <b style={{ color: 'var(--white)' }}>{data[0].isScheduled}</b> Exam
        </span>

        <div className={`${styles.exam_landing_info_container}`}>
          <section className={`${styles.exam_landing_info_container_1}`}>
            <p className={`${styles.exam_landing_info_key}`}>Schedule:</p>
            <p className={`${styles.blank_space}`}></p>
            <p className={`${styles.exam_landing_info_key}`}>Expertise Level: </p>
            <p className={`${styles.exam_landing_info_key}`}>Proctoring: </p>
            <p className={`${styles.exam_landing_info_key}`}>Duration: </p>
            <p className={`${styles.exam_landing_info_key}`}>Total Number of Questions: </p>
            <p className={`${styles.exam_landing_info_key}`}>Negative Marking: </p>
            <p className={`${styles.exam_landing_info_key}`}>Total Number of Attempts: </p>
          </section>

          <section className={`${styles.exam_landing_info_container_2}`}>
            <p>{data[0].schedule}</p>
            <p style={{ color: 'var(--dark_three)' }}>{data[0].time}</p>
            <p>{data[0].expertiseLevel}</p>
            <p>{data[0].proctoring}</p>
            <p>{data[0].duration}</p>
            <p>{data[0].totalQuestions}</p>
            <p>{data[0].negativeMarking}</p>
            <p>{data[0].numberOfAttempts}</p>
          </section>
        </div>
      </div>
      <div className={`${styles.exam_landing_btn_container}`}>
        <section style={{ marginRight: '5%' }}>
          <button className={`${styles.exam_landing_btn}`}>Take Sample Test</button>
          <button
            onClick={() => router.push('/exam-screen')}
            className={`${styles.exam_landing_btn} ${styles.exam_landing_btn_takeExam}`}>
            Take Exam Now
          </button>
          <div>
            <p
              style={{
                color: 'var(--white)',
                fontSize: '10px',
                textAlign: 'right',
                marginTop: '10px'
              }}>
              This link will be active 15 minutes before the exam
            </p>
          </div>
        </section>
        <section>
          <button className={`${styles.exam_landing_btn}`}>View Full Course</button>
          <button className={`${styles.exam_landing_btn}`} style={{ color: 'var(--dark_three' }}>
            Skip Exam
          </button>
        </section>
      </div>
    </div>
  );
};

export default ExamLandingPage;
