import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_QUESTION_PAPER_META,
  queryClient
} from '../../../API/Queries';
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

  const [examData, setExamData] = useState(null);

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
      schedule_type: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      sub_category: masterData.SubCategory,
      category: masterData.Category,

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
      sub_category: paperMasterData?.SubCategory,
      description: paperMasterData?.Description,
      section_wise: paperMasterData?.SectionWise,
      difficulty_level: paperMasterData?.DifficultyLevel,
      suggested_duration: paperMasterData?.SuggestedDuration,
      status: paperMasterData?.Status
    };

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
      passing_criteria: insData?.PassingCriteria?.split('-')[0],
      passing_criteria_type: insData?.PassingCriteria?.split('-')[1] || 'Marks',
      is_attempts_visible: insData?.NoAttempts > 1,
      no_attempts: insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      access_type: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
    };

    // load schedule
    let schObj = {};
    if (masterObj.schedule_type === 'scheduled') {
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
        exam_start_date: new Date(+schData?.Start * 1000),
        exam_start_time: new Date(+schData?.Start * 1000),
        exam_end_date: new Date(+schData?.End * 1000),
        exam_end_time: new Date(+schData?.End * 1000),
        buffer_time: schData?.BufferTime || 0,
        is_stretch: !!+schData?.End,
        is_schedule_active: schData?.IsActive || false
      };
    }

    setExamData({
      testSeries: 'PMP Test Series',
      testSequence: 'M1A4',
      proctoring: 'No',
      totalQuestions: 0,
      negativeMarking: 'No',

      testName: masterObj?.name,
      schedule: +schObj?.[0]?.exam_start_date || null,
      isScheduled: masterObj?.schedule_type,
      expertiseLevel: paperMaster?.difficulty_level,
      duration: paperMaster?.suggested_duration,
      numberOfAttempts: insObj?.no_attempts
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
          <p id={`${styles.exam_landing_head_testSeries}`}>{examData?.testSeries}</p>
          <p id={`${styles.exam_landing_head_testDescription}`}>
            {examData?.testSequence} : {examData?.testName}
          </p>
        </div>
      </div>

      <ExamPreview data={examData || {}} />

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
