import { GET_USER_EXAM_ATTEMPTS, userQueryClient } from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import { BookmarkStartTimeAtom } from '@/components/CustomVideoPlayer/Logic/customVideoPlayer.helper';
import { getEndTime } from '@/components/LearnerExamComp/Logic/exam.helper.js';
import SessionJoinCard from '@/components/Vctools/SessionJoinCard';
import { limitValueInRange } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { SwitchToTopicAtom } from '@/state/atoms/utils.atoms';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { GET_TOPIC_EXAMS } from '../../../../API/Queries';
import { loadQueryDataAsync } from '../../../../helper/api.helper';
import {
  filterAndSortTopicsBasedOnModuleId,
  filterTopicContent
} from '../../../../helper/data.helper';
import {
  ActiveClassroomTopicIdAtom,
  QuizAtom,
  TopicAtom,
  TopicContentAtom,
  TopicExamAtom,
  getTopicExamObj,
  isLoadingAtom
} from '../../../../state/atoms/module.atoms';
import {
  QuizProgressDataAtom,
  UserCourseDataAtom,
  VideoAtom,
  getVideoObject
} from '../../../../state/atoms/video.atom';
import { updateVideoData } from '../../Logic/courseBody.helper';
import {
  ShowNotAssignedErrorAtom,
  imageTypeTopicBox,
  passingCriteriaSymbol
} from '../../Logic/topicBox.helper';
import useLoadExamData from '../../Logic/useLoadExamData';
import styles from '../../courseBody.module.scss';
import ClassroomTopicSection from '@/components/Vctools/ClassroomTopicSection';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { getSessionStatus } from '@/components/Vctools/help/vctool.helper';
import moment from 'moment';

let topicInstance = 0;

function* getTopicsIndex(isReset = null) {
  if (isReset) topicInstance = -1;

  yield ++topicInstance;
}

export default function TopicBox({
  topicCount,
  topic,
  topicIndex = null,
  topicContent,
  isFirstChapter = false,
  moduleId,
  getModuleOptions,
  currrentModule,
  setSelectedModule,
  showResources
}) {
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(topic?.id));

  const { name, description, type } = topic;
  const duration = topicContent[0]?.duration.toString();
  // const duration = 3965;
  const topicData = useRecoilValue(TopicAtom);
  const topicContentData = useRecoilValue(TopicContentAtom);
  const quizProgressData = useRecoilValue(QuizProgressDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userDataGlobal = useRecoilValue(UserDataAtom);

  const router = useRouter();
  const activateExam = router?.query?.activateExam || null;

  const isLoading = useRecoilValue(isLoadingAtom);
  const allModuleOptions = getModuleOptions();

  const bookmarkStartTime = useRecoilValue(BookmarkStartTimeAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const [activeClassroomTopicId, setActiveClassroomTopicId] = useRecoilState(
    ActiveClassroomTopicIdAtom
  );
  const [switchToTopic, setSwitchToTopic] = useRecoilState(SwitchToTopicAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [quizData, setQuizData] = useRecoilState(QuizAtom);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [topicCountDisplay, setTopicCountDisplay] = useState(0);
  const [examAttempts, setExamAttempts] = useState([]);
  const [showAlert, setShowAlert] = useRecoilState(ShowNotAssignedErrorAtom);

  const [examData, setExamData] = useState({
    id: null,
    topicId: null,
    courseId: null,
    examId: null,
    language: null
  });

  const data = {};
  let finalEndDate;
  data.examData = useLoadExamData(examData?.examId);
  if (data?.examData?.scheduleType === SCHEDULE_TYPE[0] && !data?.examData?.examEnd)
    finalEndDate = new Date(getEndTime(data));

  useEffect(() => {
    if (userCourseData?.triggerPlayerToStartAt === null) return;

    const filteredTopic = topicData?.find((topic) => topic?.id === userCourseData?.activeTopic?.id);
    if (filteredTopic?.type === 'Assessment') return loadTopicExam();

    if (!userCourseData?.activeTopicContent?.id) return;

    if (
      userCourseData?.activeTopicContent?.id !==
      videoData?.topicContent[videoData?.currentTopicContentIndex]?.id
    ) {
      const filteredTopicContent = filterTopicContent(
        topicContentData,
        userCourseData?.activeTopic?.id
      );

      updateVideoData(
        videoData,
        setVideoData,
        { moduleId: userCourseData?.activeModule?.id, topicId: userCourseData?.activeTopic?.id },
        topicData,
        filteredTopicContent,
        allModuleOptions,
        {
          value: userCourseData?.activeModule?.id,
          label: `MODULE ${userCourseData?.activeModule?.index + 1}`
        },
        setSelectedModule,
        userCourseData,
        setUserCourseData
      );
    }
  }, [userCourseData]);

  useEffect(async () => {
    if (topic?.type !== 'Assessment') return;

    const topicExam = await loadQueryDataAsync(GET_TOPIC_EXAMS, { topic_id: topic.id }).then(
      (res) => res?.getTopicExams?.[0]
    );

    if (!topicExam) {
      if (router?.asPath?.includes('admin'))
        setToastMsg({ type: 'danger', message: `No exam added for topic: ${topic.name}` });
      return;
    }

    setExamData({
      id: topicExam.id,
      topicId: topicExam.topicId,
      courseId: topicExam.courseId,
      examId: topicExam.examId,
      language: topicExam.language
    });
  }, []);

  // open exam landing page if params exists
  useEffect(() => {
    if (!activateExam) return;
    if (!examData?.examId) return;

    loadTopicExam({ examId: activateExam, filter: true });
  }, [activateExam, examData?.examId]);

  let topicImageLink = imageTypeTopicBox(type);

  // calculate topic Index with generator function
  useEffect(() => {
    if (isFirstChapter) getTopicsIndex(true).next();
    if (topicIndex) return setTopicCountDisplay(topicIndex);

    setTopicCountDisplay(getTopicsIndex().next()?.value);
    // return () => getTopicsIndex(true).next();
  }, []);

  // udpate course hero based on state set (bookmark and continue with course btn)
  useEffect(() => {
    if (topic?.id !== bookmarkStartTime?.topicId) return;

    if (type === 'Assessment')
      // if (!userCourseData?.userCourseMapping?.user_course_id) return;
      return loadTopicExam();

    // if (type === 'Content') {
    if (!topicContent.length) return console.log('no topic content found');

    setTopicExamData(getTopicExamObj());
    updateVideoData(
      videoData,
      setVideoData,
      { moduleId: moduleId, topicId: topic.id },
      topicData,
      topicContent,
      allModuleOptions,
      currrentModule,
      setSelectedModule,
      userCourseData,
      setUserCourseData
    );
  }, [bookmarkStartTime, topicContent.length]);

  // auto play video when next or previous button clciked (module switch)
  // set exam data if 1st one is exam
  useEffect(async () => {
    if (
      currrentModule.value !== videoData.currentModuleId &&
      videoData.startPlayer &&
      currrentModule.isVideoControlClicked
    ) {
      const lastModuleIndex = videoData.currentModuleIndex;
      const currentModuleIndex = allModuleOptions.findIndex(
        (m) => m.value === currrentModule.value
      );
      const filteredTopicData = filterAndSortTopicsBasedOnModuleId(topicData, moduleId);

      // to detect is next button clicked or previous button clicked
      let isNextClicked = false;
      if (lastModuleIndex < currentModuleIndex) isNextClicked = true;
      if (isNextClicked && topicCount !== 1) return;
      if (!isNextClicked && topicCount !== filteredTopicData.length) return;

      // set next or prev module exam
      const goToTopicIndex = isNextClicked ? 0 : filteredTopicData.length - 1;
      if (filteredTopicData[goToTopicIndex]?.type === 'Assessment') {
        const topicExam = await loadQueryDataAsync(GET_TOPIC_EXAMS, { topic_id: topic.id }).then(
          (res) => res.getTopicExams[0]
        );

        if (!topicExam) {
          if (router?.asPath?.includes('admin'))
            setToastMsg({
              type: 'danger',
              message: `No exam added for topic: ${topic.name}`
            });
          return;
        }

        // reset recoil and set new data
        setVideoData(getVideoObject());
        setTopicExamData({
          id: topicExam.id,
          topicId: topicExam.topicId,
          courseId: topicExam.courseId,
          examId: topicExam.examId,
          language: topicExam.language,
          currentModule: currrentModule,
          currentTopic: topic
        });
        return;
      }

      updateVideoData(
        videoData,
        setVideoData,
        { moduleId: moduleId, topicId: topic.id },
        topicData,
        topicContent,
        allModuleOptions,
        currrentModule,
        setSelectedModule,
        userCourseData,
        setUserCourseData
      );
      setSelectedModule({
        ...currrentModule,
        isVideoControlClicked: false
      });
    }
  }, [currrentModule]);

  useEffect(() => {
    if (!switchToTopic && !switchToTopic?.id) return;
    if (topic?.id !== switchToTopic?.id) return;
    // console.log('switchToTopic', switchToTopic);

    if (type === 'Assessment') return loadTopicExam();

    if (!topicContent.length) return console.log('no topic content found');

    setSwitchToTopic(null);
    setTopicExamData(getTopicExamObj());
    updateVideoData(
      videoData,
      setVideoData,
      { moduleId: moduleId, topicId: topic.id },
      topicData,
      topicContent,
      allModuleOptions,
      currrentModule,
      setSelectedModule,
      userCourseData,
      setUserCourseData
    );
  }, [switchToTopic, examData]);

  // quiz
  // useEffect(() => {
  //   if (topic?.type !== 'Content') return;

  //   const allQuiz = [];

  //   setQuizData([]);
  //   async function loadQuiz() {
  //     let topicQuiz = allQuiz?.find((quiz) => quiz?.topicId === topic?.id);

  //     if (!topicQuiz) {
  //       const quizRes = await loadQueryDataAsync(
  //         GET_TOPIC_QUIZ,
  //         { topic_id: topic?.id },
  //         { fetchPolicy: 'no-cache' }
  //       );

  //       if (quizRes?.getTopicQuizes) {
  //         topicQuiz = [...quizRes?.getTopicQuizes]?.sort((q1, q2) => q1?.sequence - q2?.sequence);
  //         // console.log([...quizData, ...topicQuiz]);
  //         allQuiz.push(...topicQuiz);
  //       }
  //     }

  //     return allQuiz;
  //   }

  //   loadQuiz().then((newQuiz) => {
  //     if (newQuiz?.length)
  //       setQuizData((prev) => {
  //         console.log(prev, newQuiz);
  //         const filteredQuiz = newQuiz?.filter((quiz) => !prev?.find((q) => q?.id === quiz?.id));

  //         return [...prev, ...filteredQuiz];
  //       });
  //   });
  // }, []);

  // load user exam attempts data
  useEffect(() => {
    if (type !== 'Assessment') return;
    const topicExam = examData;
    if (!topicExam?.id) return;

    async function loadUserExamAttempts() {
      const attemptRes = await loadQueryDataAsync(
        GET_USER_EXAM_ATTEMPTS,
        { user_id: userData?.id, exam_id: topicExam?.examId },
        {},
        userQueryClient
      );
      const userCourseProgressId = userCourseData?.userCourseProgress?.find(
        (cp) => cp?.topic_id === topicExam.topicId
      )?.user_cp_id;
      const examAttemptData =
        attemptRes?.getUserExamAttempts?.filter(
          (ea) =>
            ea?.exam_id === topicExam.examId &&
            ea?.attempt_status === 'completed' &&
            ea?.user_cp_id === userCourseProgressId
        ) || [];
      setExamAttempts(examAttemptData);
    }

    loadUserExamAttempts();
  }, [examData]);

  async function loadTopicExam(obj) {
    if (topic?.type !== 'Assessment') return;
    if (obj?.filter && obj?.examId !== examData?.examId) return;

    const topicExam = examData;
    if (!topicExam?.id) return;
    // setToastMsg({ type: 'danger', message: 'No Exam Added!' });

    // reset recoil and set new data
    setVideoData(getVideoObject());
    setTopicExamData({
      id: topicExam.id,
      topicId: topicExam.topicId,
      courseId: topicExam.courseId,
      examId: topicExam.examId,
      language: topicExam.language,
      currentModule: currrentModule,
      currentTopic: topic
    });
  }

  const { allModuleTopic, currentTopicIndex } = videoData;
  let isTopicActive = topicExamData?.topicId === topic.id;
  if (allModuleTopic && allModuleTopic[currentTopicIndex]?.id === topic.id) isTopicActive = true;

  const currentProgressIndex =
    topic?.type === 'Content'
      ? userCourseData?.userCourseProgress?.findIndex((obj) => obj?.topic_id === topic?.id)
      : -1;

  const progressBarStyles = {
    backgroundColor:
      userCourseData?.userCourseProgress?.[currentProgressIndex]?.status === 'completed'
        ? '#12664f'
        : '',
    width: `${limitValueInRange(
      +userCourseData?.userCourseProgress?.[currentProgressIndex]?.video_progress
    )}%`
  };

  if (topic?.id === userCourseData?.activeTopic?.id && videoData?.type === 'mp4') {
    progressBarStyles.width = `${userCourseData?.videoData?.progress || 0}%`;
  }

  // https://stackoverflow.com/a/45998597
  const quizId = [];

  const attemptedQuiz =
    quizProgressData
      ?.filter((quiz) => {
        if (quizId?.includes(quiz?.quiz_id)) return false;

        quizId.push(quiz?.quiz_id);
        return true;
      })
      ?.filter((quiz) => quiz?.topic_id === topic?.id)?.length || 0;
  const totalQuiz = quizData?.filter((quiz) => quiz?.topicId === topic?.id)?.length || 0;

  function displayDuration(duration) {
    if (duration <= 60) return `${duration} seconds`;

    const hours = ('0' + Math.floor(duration / (60 * 60))).substr(-2) || '00';

    const divisor_for_minutes = duration % (60 * 60);
    const minutes = ('0' + Math.floor(divisor_for_minutes / 60)).substr(-2) || '00';

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = ('0' + Math.ceil(divisor_for_seconds)).substr(-2) || '00';

    if (hours == '00') return `${minutes}:${seconds} mins`;
    return `${hours}:${minutes}:${seconds}`;
  }
  const isDocument = topicContent?.[0]?.type === 'document';

  return (
    <>
      <div
        className={`${styles.topic}`}
        onClick={() => {
          if (
            (!router?.asPath?.includes('preview') &&
              !userCourseData?.userCourseMapping?.user_course_id) ||
            userCourseData?.userCourseMapping?.course_status?.toLowerCase() === 'disabled'
          )
            return setShowAlert(true);

          // if (!userCourseData?.userCourseMapping?.user_course_id) return;
          if (type === 'Assessment') {
            setActiveClassroomTopicId(null);
            setVideoData(getVideoObject());
            return loadTopicExam();
          }
          if (type === 'Classroom') {
            if (!classroomData?.id) return;

            const status = getSessionStatus(
              +classroomData?.trainingStartTime,
              +classroomData?.trainingEndTime
            );
            const endTime = moment(classroomData.trainingEndTime * 1000);
            setTopicExamData(getTopicExamObj());

            const isRecordingAvailable = moment().diff(endTime, 'minute') >= 5;

            if (status === 2 && isRecordingAvailable) {
              updateVideoData(
                { ...(videoData || {}), videoSrc: '/videos/classroom-recording-demo.webm' },
                setVideoData,
                { moduleId: moduleId, topicId: topic.id },
                topicData,
                [
                  {
                    topicId: topic?.id,
                    moduleId: topic?.moduleId,
                    id: 'uniqueId',
                    language: classroomData?.language,
                    type: 'mp4',
                    duration: classroomData?.duration,
                    is_default: true,
                    contentUrl: '/videos/classroom-recording-demo.webm'
                  }
                ],
                allModuleOptions,
                currrentModule,
                setSelectedModule,
                userCourseData,
                setUserCourseData
              );
              return;
            }

            setVideoData(getVideoObject());
            return setActiveClassroomTopicId(topic?.id);
          }

          // if (type === 'Content') {
          if (!topicContent.length) return console.log('no topic content found');

          setTopicExamData(getTopicExamObj());
          setActiveClassroomTopicId(null);

          updateVideoData(
            videoData,
            setVideoData,
            { moduleId: moduleId, topicId: topic.id },
            topicData,
            topicContent,
            allModuleOptions,
            currrentModule,
            setSelectedModule,
            userCourseData,
            setUserCourseData
          );
          // }
        }}>
        <div className={`${styles.preclassName}`}>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              showResources(topic);
            }}>
            <img src="/images/resourcesicon.png" />
            <p>Resources</p>
          </div>
          {/* <div>
            <img src="images/discussicon.png" />
            <p>Discuss</p>
          </div> */}
        </div>

        <div
          className={`${styles.topic_loop} ${isTopicActive ? styles.activeTopic : ''}  ${
            type === 'Classroom' && !classroomData?.id ? 'disabled' : ''
          }`}>
          <div className={`${styles.topic_img}`}>
            <img src={`${topicImageLink}`} alt="" />
          </div>

          <div className={`${styles.topic_text}`}>
            <div className={`${styles.topic_number}`}>
              <span>
                {isLoading ? (
                  <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={50} />
                ) : (
                  topicCountDisplay + '. '
                )}
              </span>
            </div>
            <div className={`${styles.topic_meta}`}>
              <div className={`${styles.topic_heading}`}>
                <h4>
                  {isLoading ? (
                    <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={150} />
                  ) : name ? (
                    name
                  ) : (
                    'N/A'
                  )}
                </h4>
              </div>
              <div className={`${styles.topic_description}`}>
                <p>
                  {isLoading ? (
                    <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={500} />
                  ) : description ? (
                    description
                  ) : (
                    'N/A'
                    // 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint eos quisquam beatae doloremque rem, deleniti dolor odio accusamus doloribus harum cumque fugiat, suscipit illo, molestias adipisci fugit porro ratione tenetur.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {type === 'Content' && (
            <div className={`${styles.topic_player}`}>
              {!isDocument ? (
                <div className={`${styles.progress_bar}`}>
                  <div className={`${styles.progressBarFill}`} style={progressBarStyles}>
                    {/* <img src="images/progressTriangle.png" alt="" /> */}
                  </div>
                </div>
              ) : (
                <div className={`${styles.startReading}`}>Start Reading</div>
              )}
              <div className={`${styles.details}`}>
                <div>{isDocument ? 'Document' : 'e-Content'}</div>
                <div>
                  {!!totalQuiz && (
                    <>
                      Quiz: {attemptedQuiz || 0} / {totalQuiz}
                    </>
                  )}
                </div>
                <div>
                  <span>
                    {isLoading ? (
                      <Skeleton
                        sx={{ bgcolor: 'dimgray' }}
                        variant="rectangular"
                        height={20}
                        width={100}
                      />
                    ) : duration ? (
                      `${isDocument ? 'Read Time' : 'Duration'} : ${displayDuration(duration)}`
                    ) : (
                      'N/A'
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          {type === 'Assessment' && (
            <div className={`${styles.topic_assesment}`}>
              <div className={`${styles.assesmentType}`}>
                {data?.examData?.scheduleType === SCHEDULE_TYPE[0] ? (
                  <div>
                    <span>{data?.examData?.examStart?.toDateString()}</span>

                    <span>
                      {data?.examData?.examStart?.toLocaleTimeString()}-
                      {data?.examData?.examEnd
                        ? data?.examData?.examEnd?.toLocaleTimeString()
                        : finalEndDate.toLocaleTimeString()}
                    </span>
                    <span className={`${styles.scheduleType}`}>
                      {data?.examData?.scheduleType.charAt(0).toUpperCase() +
                        data?.examData?.scheduleType.slice(1)}{' '}
                      Exam
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className={`${styles.scheduleType}`}>Take Anytime Exam</span>
                  </div>
                )}
              </div>
              <div className={`${styles.assesmentInfo}`}>
                <span>
                  Marks: {!!data?.examData?.totalMarks ? `${data?.examData?.totalMarks}` : ''}
                </span>
                <span>
                  Passing Criteria: {passingCriteriaSymbol(data?.examData?.passingCriteria)}
                </span>
                <span>{data?.examData?.difficultyLevel}</span>

                <span>
                  Attempt:{' '}
                  {+data?.examData?.noAttempts < 0 ? (
                    <>{examAttempts?.length}/&infin;</>
                  ) : (
                    `${examAttempts?.length}/${data?.examData?.noAttempts}`
                  )}
                </span>

                {!!data?.examData?.duration && (
                  <span>Duration: {`${data?.examData?.duration} mins`}</span>
                )}
              </div>
            </div>
          )}
          {type === 'Lab' && (
            <div className={`${styles.topic_player}`}>
              {/* <div className={`${styles.progress_bar}`}>
                <img src="images/progressTriangle.png" alt="" />
              </div>
              <div className={`${styles.details}`}>
                <div>Video + Quiz</div>
                <div>
                  <span>
                    {isLoading ? (
                      <Skeleton
                        sx={{ bgcolor: 'dimgray' }}
                        variant="rectangular"
                        height={20}
                        width={100}
                      />
                    ) : duration ? (
                      `Duration : ${duration}`
                    ) : (
                      'N/A'
                    )}
                  </span>
                </div>
              </div> */}
            </div>
          )}
          {type === 'Classroom' && (
            <div className={`${styles.topic_player}`}>
              <ClassroomTopicSection topicId={topic?.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
