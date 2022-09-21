import { GET_USER_EXAM_ATTEMPTS, userQueryClient } from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import AttempHistory from '@/components/AttemptHistory';
import { getEndTime } from '@/components/LearnerExamComp/Logic/exam.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { SYNC_DATA_IN_SECONDS } from '@/helper/constants.helper';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { SwitchToTopicAtom } from '@/state/atoms/utils.atoms';
import { getVideoObject, UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_QUESTION_PAPER_META,
  queryClient
} from '../../../API/Queries';
import { LearnerExamAtom } from '../../../state/atoms/exams.atoms';
import { getTopicExamObj, TopicExamAtom } from '../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import ExamPreview from '../common/ExamPreview';
import styles from './examLanding.module.scss';

export default function ExamLanding({ testType = 'Exam', isDisplayedInCourse = false }) {
  const { fullCourse } = useContext(courseContext);
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
  const [loadConfig, { error: loadConfigError }] = useLazyQuery(GET_EXAM_CONFIG, {
    client: queryClient
  });

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [switchToTopic, setSwitchToTopic] = useRecoilState(SwitchToTopicAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const userData = useRecoilValue(UserStateAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);
  var btnStyle;

  const [userExamData, setUserExamData] = useState({
    userAttempts: [],
    cpId: '',
    isBtnActive: false,
    nextTopic: null
  });
  const [isAttemptHistoryOpen, setIsAttempyHistoryOpen] = useState(null);
  const [counter, setCounter] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setUserCourseData({
      ...userCourseData,
      activeModule: { index: null, id: null },
      activeTopic: { index: null, id: null },
      activeTopicContent: { index: null, id: null },
      activeTopicSubtitle: { index: null, id: null }
    });
    setVideoData(getVideoObject());
  }, []);

  useEffect(async () => {
    const examId = topicExamData?.examId || null;
    if (!examId) return;

    // load master data
    let isError = false;
    const masterRes = await loadMaster({ variables: { exam_ids: [examId] } }).catch((err) => {
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
      noAttempts: +insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
    };

    // load schedule
    let schObj = {};
    if (masterObj.scheduleType === 'scheduled') {
      const schRes = await loadSchedule({ variables: { exam_id: examId } }).catch((err) => {
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

    // load config
    const confRes = await loadConfig({ variables: { exam_id: examId } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Config load error' });
    });
    if (isError) return;
    const confData = confRes?.data?.getExamConfiguration[0];
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      display_hints: confData?.DisplayHints || false,
      show_result: confData?.ShowResult || false,
      show_answer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || false
    };

    const userCourseProgressId = userCourseData?.userCourseProgress?.find(
      (cp) => cp?.topic_id === topicExamData?.topicId
    )?.user_cp_id;

    const attemptRes = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: userData?.id, user_lsp_id: 'Zicops' },
      {},
      userQueryClient
    );
    const examAttemptData =
      attemptRes?.getUserExamAttempts?.filter(
        (ea) =>
          ea?.exam_id === examId &&
          ea?.attempt_status === 'completed' &&
          ea?.user_cp_id === userCourseProgressId
      ) || [];

    const _examData = {
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        ...schObj,
        ...confObj
      },
      landingPageData: {
        testSeries: fullCourse?.name,
        testSequence: `M${topicExamData?.currentModule?.label.split(' ')[1]}A${
          topicExamData?.currentTopic?.sequence
        }`,
        isProctoring: false,
        totalQuestions: 0,
        isNegativeMarking: false,
        expertiseLevel: paperMaster?.difficultyLevel
      }
    };

    setUserExamData({
      userAttempts: examAttemptData,
      cpId: userCourseProgressId,
      isBtnActive: getIsExamAccessible(examAttemptData, _examData),
      nextTopic: getNextTopicId()
    });
    setLearnerExamData(_examData);
    // console.log(switchToTopic);
  }, [topicExamData?.examId, topicExamData?.topicId]);

  useEffect(() => {
    let timer = null;
    if (userExamData?.isBtnActive) return clearInterval(timer);

    timer = setInterval(() => setCounter((prev) => !prev), SYNC_DATA_IN_SECONDS * 1000);

    return () => clearInterval(timer);
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

  function getNextTopicId() {
    let nextTopic = null;
    let modId = null;
    let currentTopic = null;
    userCourseData?.allModules?.some((mod, modIndex) => {
      if (nextTopic === 0) {
        nextTopic = mod?.topicData?.find((topic) => topic?.sequence === 1);
      } else {
        currentTopic = mod?.topicData?.find((topic) => topic?.id === topicExamData?.topicId);

        nextTopic = mod?.topicData?.find((topic) => topic?.sequence === currentTopic?.sequence + 1);
        // console.log(currentTopic, nextTopic);

        if (!nextTopic && currentTopic) {
          // console.log(nextTopic, currentTopic);
          if (userCourseData?.allModules?.length !== modIndex + 1) {
            nextTopic = 0;
          }
        }
      }

      // mod?.topicData?.some((topic, topicIndex) => {
      //   console.log(topic);
      //   if (currentTopic) {
      //     const topicProgress = userCourseData?.userCourseProgress?.find(
      //       (obj) => obj?.topic_id === topic?.id
      //     );

      //     nextTopicData = {
      //       activeModule: { index: modIndex, id: mod?.id },
      //       activeTopic: { index: topicIndex, id: topic?.id },
      //       activeTopicContent: { index: 0, id: topic?.topicContentData[0]?.id },
      //       triggerPlayerToStartAt: +topicProgress?.video_progress || 0
      //     };
      //     console.log(nextTopicData);
      //     return true;
      //   }
      //   if (topic?.id !== topicExamData?.topicId) return false;
      //   if (topic?.id === topicExamData?.topicId) return (currentTopic = true);
      // });

      return !!nextTopic;
    });

    // if (!nextTopicData) data = { ...nextTopicData };

    // console.log(nextTopic, currentTopic);
    return nextTopic;
  }

  const { exam_landing_btn_container, exam_landing_btn_container1 } = styles;

  btnStyle = testType === 'Quiz' ? exam_landing_btn_container : exam_landing_btn_container1;

  return (
    <div
      className={`${styles.exam_landing}`}
      ref={(elem) =>
        elem?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }>
      <div className={`${styles.exam_landing_head}`}>
        <button
          className={`${styles.exam_landing_head_btn}`}
          onClick={() => {
            if (isDisplayedInCourse) return setTopicExamData(getTopicExamObj());

            router.back();
          }}>
          <img src="/images/Back.png" />
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
        noAttempts={
          +learnerExamData?.examData?.noAttempts > 0
            ? learnerExamData?.examData?.noAttempts
            : 'Unlimited'
        }
      />

      <div className={`${styles.btnContainer} ${btnStyle}`}>
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
                `${router.asPath}/topic/${topicExamData?.topicId}/exam/${topicExamData?.examId}`
              );
            }}
            disabled={!userExamData?.isBtnActive}
            className={`${styles.exam_landing_btn} ${
              !userExamData?.isBtnActive ? styles.exam_landing_btn_takeExam : ''
            }`}>
            Take Exam Now
          </button>
          {testType === 'Exam' &&
            SCHEDULE_TYPE[0]?.includes(learnerExamData?.examData?.scheduleType) && (
              <div>
                <p
                  style={{
                    color: 'var(--white)',
                    fontSize: '10px',
                    textAlign: 'right',
                    marginTop: '5px',
                    marginRight: '-15px'
                  }}>
                  This link will be active 15 minutes before the exam
                </p>
              </div>
            )}
        </section>

        {testType === 'Exam' && (
          <section>
            {/* <button className={`${styles.exam_landing_btn}`}>View Full Course</button> */}
            <button
              disabled={!userExamData?.nextTopic}
              className={`${styles.exam_landing_btn} ${
                !userExamData?.nextTopic ? styles.exam_landing_btn_takeExam : ''
              }`}
              onClick={() => setSwitchToTopic(userExamData?.nextTopic)}>
              {userExamData?.userAttempts?.length ? 'Next' : 'Skip'}
            </button>
          </section>
        )}
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
