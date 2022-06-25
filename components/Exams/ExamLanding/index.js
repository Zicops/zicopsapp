import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_QUESTION_PAPER_META,
  queryClient
} from '../../../API/Queries';
import { LearnerExamAtom } from '../../../state/atoms/exams.atoms';
import { TopicExamAtom } from '../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import ExamPreview from '../common/ExamPreview';
import styles from './examLanding.module.scss';

export default function ExamLanding() {
  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient
  });
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient
  });
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  const router = useRouter();

  useEffect(async () => {
    const examId = topicExamData?.examId || null;
    if (!examId) return;

    // load master data
    let isError = false;
    const masterRes = await loadMaster({
      variables: { exam_ids: [examId] },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return;
    const masterData = masterRes?.data?.getExamsMeta[0];
    if (!masterData) return;
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,
      duration: masterData.Duration,
      scheduleType: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      category: masterData.Category,
      subCategory: masterData.SubCategory,

      status: masterData.Status,
      is_exam_active: masterData.IsActive
    };

    const metaRes = await loadPaperMeta({
      variables: { question_paper_id: [masterObj?.qpId] }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    });
    if (isError) return;
    const paperMasterData = metaRes.data.getQPMeta[0];

    const paperMaster = {
      category: paperMasterData?.Category,
      subCategory: paperMasterData?.SubCategory,
      description: paperMasterData?.Description,
      section_wise: paperMasterData?.SectionWise,
      difficultyLevel: paperMasterData?.DifficultyLevel,
      suggested_duration: paperMasterData?.SuggestedDuration,
      status: paperMasterData?.Status
    };

    masterObj.category = paperMaster.category;
    masterObj.subCategory = paperMaster.subCategory;

    // load instructions
    const insRes = await loadInstructions({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const insData = insRes?.data?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria,
      noAttempts: insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
    };

    // load schedule
    let schObj = {};
    if (masterObj.scheduleType === 'scheduled') {
      const schRes = await loadSchedule({
        variables: { exam_id: examId },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      if (isError) return;
      const schData = schRes?.data?.getExamSchedule[0];

      schObj = {
        scheduleId: schData?.id || null,
        examStart: new Date(+schData?.Start * 1000),
        examEnd: new Date(+schData?.End * 1000),
        bufferTime: schData?.BufferTime || 0,
        is_schedule_active: schData?.IsActive || false
      };
    }

    setLearnerExamData({
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        ...schObj
      },
      landingPageData: {
        testSeries: 'PMP Test Series',
        testSequence: 'M1A4',
        isProctoring: 'No',
        totalQuestions: 0,
        isNegativeMarking: 'No',
        expertiseLevel: paperMaster?.difficultyLevel
      }
    });
  }, []);

  return (
    <div
      className={`${styles.exam_landing}`}
      ref={(elem) =>
        elem?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }>
      <div className={`${styles.exam_landing_head}`}>
        <button className={`${styles.exam_landing_head_btn}`} onClick={() => router.back()}>
          <img src="./images/Back.png" />
        </button>
        <div className={`${styles.exam_landing_head_container}`}>
          <p id={`${styles.exam_landing_head_testSeries}`}>
            {learnerExamData?.landingPageData?.testSeries}
          </p>
          <p id={`${styles.exam_landing_head_testDescription}`}>
            {learnerExamData?.landingPageData?.testSequence} : {learnerExamData?.examData?.name}
          </p>
        </div>
      </div>

      <ExamPreview
        examName={learnerExamData?.examData?.name}
        scheduleType={learnerExamData?.examData?.scheduleType}
        scheduleDate={learnerExamData?.examData?.examStart || new Date()}
        difficulty={learnerExamData?.landingPageData?.expertiseLevel}
        duration={learnerExamData?.examData?.duration}
        isProctoring={learnerExamData?.landingPageData?.isProctoring}
        totalQuestions={learnerExamData?.landingPageData?.totalQuestions}
        isNegativeMarking={learnerExamData?.landingPageData?.isNegativeMarking}
        noAttempt={learnerExamData?.examData?.noAttempts}
      />

      <div className={`${styles.exam_landing_btn_container}`}>
        <section style={{ marginRight: '5%' }}>
          <button className={`${styles.exam_landing_btn}`}>Take Sample Test</button>
          <button
            onClick={() => router.push(`/exam-screen/${topicExamData?.examId}`)}
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
}
