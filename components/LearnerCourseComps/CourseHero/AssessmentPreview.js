import { GET_USER_EXAM_ATTEMPTS, userQueryClient } from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import AttempHistory from '@/components/AttemptHistory';
import ExamPreview from '@/components/Exams/common/ExamPreview';
import { getEndTime } from '@/components/LearnerExamComp/Logic/exam.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { SYNC_DATA_IN_SECONDS } from '@/helper/constants.helper';
import { AllCourseModulesDataAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_QUESTION_PAPER_META,
  queryClient,
} from '../../../API/Queries';
import { LearnerExamAtom, getLearnerExamObj } from '../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import useHandleTopicSwitch from '../Logic/useHandleTopicSwitch';
import {
  ActiveCourseDataAtom,
  CourseModulesAtomFamily,
  CourseTopicAssessmentAtomFamily,
  CourseTopicsAtomFamily,
  UserTopicProgressDataAtom,
} from '../atoms/learnerCourseComps.atom';
import styles from '../learnerCourseComps.module.scss';
import Spinner from '@/components/common/Spinner';

export default function AssessmentPreview() {
  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient,
  });
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient,
  });
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient,
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient,
  });
  const [loadConfig, { error: loadConfigError }] = useLazyQuery(GET_EXAM_CONFIG, {
    client: queryClient,
  });

  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const moduleData = useRecoilValue(CourseModulesAtomFamily(topicData?.moduleId));
  const topicExamData = useRecoilValue(CourseTopicAssessmentAtomFamily(activeCourseData?.topicId));
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const allModules = useRecoilValue(AllCourseModulesDataAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  const { getNextTopicId } = useHandleTopicSwitch();
  const [userExamData, setUserExamData] = useState({
    userAttempts: [],
    cpId: '',
    isBtnActive: false,
  });
  const [isAttemptHistoryOpen, setIsAttempyHistoryOpen] = useState(null);
  const [counter, setCounter] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const router = useRouter();
  const isPreview = router?.asPath?.includes('preview');

  useEffect(async () => {
    const examId = topicExamData?.examId || null;
    if (!examId) return setLearnerExamData(getLearnerExamObj());

    setIsLoading(true);
    // load master data
    let isError = false;
    const masterRes = await loadMaster({ variables: { exam_ids: [examId] } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return setIsLoading(false);
    const masterData = masterRes?.data?.getExamsMeta[0];
    if (!masterData) return setIsLoading(false);
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,
      duration: +masterData.Duration / 60,
      scheduleType: masterData.ScheduleType,
      questionIds: masterData.QuestionIds || [],
      totalQuestions: masterData.TotalCount || 0,

      code: masterData.Code,
      type: masterData.Type,
      category: masterData.Category,
      subCategory: masterData.SubCategory,

      status: masterData.Status,
      is_exam_active: masterData.IsActive,
    };

    const metaRes = await loadPaperMeta({
      variables: { question_paper_id: [masterObj?.qpId] },
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    });
    if (isError) return setIsLoading(false);
    const paperMasterData = metaRes.data.getQPMeta[0];

    const paperMaster = {
      category: paperMasterData?.Category,
      subCategory: paperMasterData?.SubCategory,
      description: paperMasterData?.Description,
      section_wise: paperMasterData?.SectionWise,
      difficultyLevel: paperMasterData?.DifficultyLevel,
      suggested_duration: +paperMasterData?.SuggestedDuration / 60,
      status: paperMasterData?.Status,
    };

    masterObj.category = paperMaster.category;
    masterObj.subCategory = paperMaster.subCategory;

    // load instructions
    const insRes = await loadInstructions({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache',
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return setIsLoading(false);
    const insData = insRes?.data?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria,
      noAttempts: +insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || '',
    };

    // load schedule
    let schObj = {};
    if (masterObj.scheduleType === 'scheduled') {
      const schRes = await loadSchedule({ variables: { exam_id: examId } }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      if (isError) return setIsLoading(false);
      const schData = schRes?.data?.getExamSchedule[0];

      schObj = {
        scheduleId: schData?.id || null,
        examStart: new Date(+schData?.Start * 1000),
        examEnd: +schData?.End ? new Date(+schData?.End * 1000) : null,
        bufferTime: schData?.BufferTime || 0,
        is_schedule_active: schData?.IsActive || false,
      };
    }

    // load config
    const confRes = await loadConfig({ variables: { exam_id: examId } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Config load error' });
    });
    if (isError) return setIsLoading(false);
    const confData = confRes?.data?.getExamConfiguration[0];
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      display_hints: confData?.DisplayHints || false,
      show_result: confData?.ShowResult || false,
      show_answer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || false,
    };

    const _examData = {
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        ...schObj,
        ...confObj,
      },
      landingPageData: {
        testSeries: courseMeta?.name,
        testSequence: `M${+moduleData?.sequence || 0}A${+topicData?.sequence || 0}`,
        isProctoring: false,
        totalQuestions: masterObj?.totalQuestions,
        isNegativeMarking: false,
        expertiseLevel: paperMaster?.difficultyLevel,
      },
    };

    if (!isPreview) {
      const userCourseProgressId = topicProgressData?.find(
        (cp) => cp?.topic_id === topicExamData?.topicId,
      )?.user_cp_id;

      const attemptRes = await loadQueryDataAsync(
        GET_USER_EXAM_ATTEMPTS,
        { user_id: userData?.id, exam_id: examId },
        {},
        userQueryClient,
      );
      const examAttemptData =
        attemptRes?.getUserExamAttempts?.filter(
          (ea) =>
            ea?.exam_id === examId &&
            ea?.attempt_status === 'completed' &&
            ea?.user_cp_id === userCourseProgressId,
        ) || [];

      setUserExamData({
        userAttempts: examAttemptData,
        cpId: userCourseProgressId,
        isBtnActive: getIsExamAccessible(examAttemptData, _examData),
      });
    }

    setIsLoading(false);
    setLearnerExamData(_examData);
  }, [topicExamData?.examId, topicExamData?.topicId, isPreview]);

  useEffect(() => {
    let timer = null;

    if (userExamData?.isBtnActive) return clearTimeout(timer);
    timer = setTimeout(() => setCounter((prev) => !prev), SYNC_DATA_IN_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  useEffect(() => {
    if (!learnerExamData?.examData?.id) return;
    if (userExamData?.isBtnActive) return;
    if (!counter) return;

    const isExamAccessible = getIsExamAccessible(userExamData?.userAttempts);

    if (isExamAccessible) setUserExamData({ ...userExamData, isBtnActive: true });
    setCounter(null);
  }, [learnerExamData, counter]);

  function getIsExamAccessible(userAttempts = [], _data = null) {
    let isAccessible = true;
    const _examData = !!_data ? _data : learnerExamData;
    if (!_examData) return false;
    if (_examData?.examData?.scheduleType === SCHEDULE_TYPE[0]) {
      const startTime = new Date(_examData?.examData.examStart);
      startTime.setMinutes(startTime.getMinutes() - 15);
      const isExamStarted = startTime < Date.now();
      // console.log(isExamStarted);
      const examEndDate = getEndTime(_examData);
      const isExamEnded = examEndDate < Date.now();
      isAccessible = isExamStarted && !isExamEnded;
      console.log(isAccessible, isExamStarted, !isExamEnded);
    }

    const noAttempts = +_examData?.examData?.noAttempts;
    if (noAttempts > 0 && noAttempts <= userAttempts?.length) isAccessible = false;

    return isAccessible;
  }

  const nextTopicData = getNextTopicId();

  if (isLoading) return <Spinner />;
  // if (!topicExamData?.id)
  //   return <div className={`center-element-with-flex h-100 text-primary`}>No Exam Added</div>;

  return (
    <div className={`${styles.exam_landing}`}>
      <div className={`${styles.exam_landing_head}`}>
        <button
          className={`${styles.exam_landing_head_btn}`}
          onClick={() => setActiveCourseData((prev) => ({ ...prev, topicId: null }))}>
          <img src="/images/Back.png" />
        </button>

        {!!topicExamData?.id && (
          <div className={`${styles.exam_landing_head_container}`}>
            <p id={`${styles.exam_landing_head_testSeries}`}>
              {learnerExamData?.landingPageData?.testSeries}
            </p>
            <p id={`${styles.exam_landing_head_testDescription}`}>
              {learnerExamData?.landingPageData?.testSequence} : {learnerExamData?.examData?.name}
            </p>
          </div>
        )}
      </div>

      {topicExamData?.id ? (
        <ExamPreview
          examName={learnerExamData?.examData?.name}
          scheduleType={learnerExamData?.examData?.scheduleType}
          scheduleDate={learnerExamData?.examData?.examStart || new Date()}
          difficulty={learnerExamData?.landingPageData?.expertiseLevel}
          duration={learnerExamData?.examData?.duration}
          isProctoring={learnerExamData?.landingPageData?.isProctoring}
          totalQuestions={learnerExamData?.landingPageData?.totalQuestions}
          isNegativeMarking={learnerExamData?.landingPageData?.isNegativeMarking}
          noAttempts={
            +learnerExamData?.examData?.noAttempts > 0
              ? learnerExamData?.examData?.noAttempts
              : 'Unlimited'
          }
        />
      ) : (
        <div className={`center-element-with-flex h-100 text-primary`}>No Exam Added</div>
      )}

      <div className={`${styles.btnContainer} ${styles.exam_landing_btn_container1}`}>
        <section className={`${styles.centerBtns}`}>
          {!userExamData?.userAttempts?.length ? (
            <button
              className={`${styles.exam_landing_btn}`}
              onClick={() => {
                localStorage?.setItem('sampleTestStartLink', router.asPath);
                router.push('/exam-screen');
              }}>
              Take Sample Test
            </button>
          ) : (
            <button
              className={`${styles.exam_landing_btn}`}
              onClick={() => setIsAttempyHistoryOpen(true)}>
              View Attempt History
            </button>
          )}
          <button
            onClick={() => {
              if (!userExamData?.isBtnActive) return;

              router.push(
                `${router.asPath}/topic/${topicExamData?.topicId}/exam/${topicExamData?.examId}`,
              );
            }}
            disabled={!(topicExamData?.id && userExamData?.isBtnActive)}
            className={`${styles.exam_landing_btn} ${
              !(topicExamData?.id && userExamData?.isBtnActive)
                ? styles.exam_landing_btn_takeExam
                : ''
            }`}>
            Take Exam Now
          </button>
          {SCHEDULE_TYPE[0]?.includes(learnerExamData?.examData?.scheduleType) && (
            <div>
              <p
                style={{
                  color: 'var(--white)',
                  fontSize: '10px',
                  textAlign: 'right',
                  marginTop: '5px',
                  marginRight: '-15px',
                }}>
                This link will be active 15 minutes before the exam
              </p>
            </div>
          )}
        </section>

        <section>
          {/* <button className={`${styles.exam_landing_btn}`}>View Full Course</button> */}
          <button
            disabled={!nextTopicData?.topicId}
            className={`${styles.exam_landing_btn} ${
              !nextTopicData?.topicId ? styles.exam_landing_btn_takeExam : ''
            }`}
            onClick={() => {
              const { topicId, moduleId } = nextTopicData;
              setActiveCourseData((prev) => ({ ...prev, topicId, moduleId }));
            }}>
            {userExamData?.userAttempts?.length ? 'Next' : 'Skip'}
          </button>
        </section>
      </div>

      {isAttemptHistoryOpen && (
        <AttempHistory
          examId={topicExamData?.examId}
          userCourseProgressId={userExamData?.cpId}
          handleClose={() => setIsAttempyHistoryOpen(false)}
        />
      )}
    </div>
  );
}
