import {
  ADD_USER_COURSE_PROGRESS,
  UPDATE_USER_COURSE,
  UPDATE_USER_COURSE_PROGRESS,
  userClient,
} from '@/api/UserMutations';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_MAP_STATUS, SYNC_DATA_IN_SECONDS, THUMBNAIL_GAP } from '@/helper/constants.helper';
import { useTimeInterval } from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { useMutation } from '@apollo/client';
import { GET_TOPIC_EXAMS } from 'API/Queries';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addUserWatchTime } from 'services/dashboard.services';
import { filterTopicContent } from '../../../helper/data.helper';
import {
  generateVideoThumbnails,
  limitValueInRange,
  secondsToHMS,
} from '../../../helper/utils.helper';
import { QuizAtom, TopicContentAtom, TopicExamAtom } from '../../../state/atoms/module.atoms';
import {
  QuizProgressDataAtom,
  UserCourseDataAtom,
  VideoAtom,
  getVideoObject,
} from '../../../state/atoms/video.atom';
import { BookmarkStartTimeAtom, addCallbackToEvent } from './customVideoPlayer.helper';

export default function useVideoPlayer(videoElement, videoContainer, set) {
  const [updateUserCourse, { error: updateUserCourseErr }] = useMutation(UPDATE_USER_COURSE, {
    client: userClient,
  });
  const [addUserCourseProgress, { error: addUserCourseProgressErr }] = useMutation(
    ADD_USER_COURSE_PROGRESS,
    { client: userClient },
  );
  const [updateUserCourseProgress, { error: updateUserCourseProgressErr }] = useMutation(
    UPDATE_USER_COURSE_PROGRESS,
    { client: userClient },
  );

  const [bookmarkStartTime, setBookmarkStartTime] = useRecoilState(BookmarkStartTimeAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const userData = useRecoilValue(UserStateAtom);

  const quizData = useRecoilValue(QuizAtom);
  const quizProgressData = useRecoilValue(QuizProgressDataAtom);
  const [videoData, updateVideoData] = useRecoilState(VideoAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const topicContent = useRecoilValue(TopicContentAtom);
  const [seek, setSeek] = useState(0);
  const [dataSyncing, setDataSyncing] = useState(false);
  const [freezeScreen, setFreezeScreen] = useState(false);
  const [hideControls, setHideControls] = useState(0);
  const [hideTopBar, setHideTopBar] = useState(0);
  const tooltip = useRef(null);
  const progressBar = useRef(null);
  const { fullCourse } = useContext(courseContext);
  const [syncProgressInSeconds, setSyncProgressInSeconds] = useState(SYNC_DATA_IN_SECONDS * 3);

  // [play,pause,forward,backward,volumeUp,volumeDown,enterFullScreen,exitFullScreen,reload,unmute,mute,next,previous]
  const [playPauseActivated, setPlayPauseActivated] = useState(null);
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0, // o - 100
    speed: 1,
    isMuted: false,
    volume: 0.7,
    timestamp: '00:00',
    duration: 0,
  });

  // for showing thumbnail previews
  const [previewImages, setPreviewImages] = useState([]);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // api call for dashboard data
  const cancel = useTimeInterval(
    () => {
      addUserWatchTime({
        courseId: fullCourse?.id,
        topicId: videoData?.topicContent?.[0]?.topicId,
        userId: userData?.id,
        category: fullCourse?.category,
        subCategories: [
          fullCourse?.sub_category,
          ...fullCourse?.sub_categories?.map((subCat) => subCat?.name),
        ],
        time: 15,
      });
    },
    15 * 1000,
    [playerState?.isPlaying],
  );
  if (!playerState?.isPlaying) cancel();

  // udpate recoil state
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    setUserCourseData({
      ...userCourseData,
      videoData: {
        ...playerState,
        videoSrc: videoData?.videoSrc,
        type: videoData?.type,
        isPreview: videoData?.isPreview,
        shouldShowPlayer: videoData?.startPlayer,
      },
      triggerPlayerToStartAt: null,
      activeModule: { index: videoData?.currentModuleIndex, id: videoData?.currentModuleId },
      activeTopic: { index: videoData?.currentTopicIndex, id: videoData?.topicContent[0]?.topicId },
    });
  }, [videoData, playerState]);

  useEffect(() => {
    if (!bookmarkStartTime?.isClickedWhenPlayerOn) return;
    if (!+bookmarkStartTime?.time || isNaN(+bookmarkStartTime?.time)) return;
    if (!videoElement.current) return;

    const bookmarkTime = +bookmarkStartTime?.time;

    videoElement.current.currentTime = bookmarkTime;
    setPlayerState({ ...playerState, progress: bookmarkTime });
    setBookmarkStartTime({
      ...bookmarkStartTime,
      topicId: null,
      time: null,
      isClickedWhenPlayerOn: null,
    });
    videoContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [bookmarkStartTime, videoElement.current]);

  // update user course data
  useEffect(async () => {
    if (videoData?.isPreview) return;
    if (!videoElement?.current?.duration) return;
    if (!userCourseData?.userCourseMapping?.user_course_id) return;

    const userCourseMapData = structuredClone(userCourseData);

    if (userCourseData?.userCourseMapping?.course_status === 'open') {
      const sendUserCourseData = {
        courseStatus: COURSE_MAP_STATUS.started,
        userCourseId: userCourseMapData?.userCourseMapping?.user_course_id,
        userId: userCourseMapData?.userCourseMapping?.user_id,
        userLspId: userCourseMapData?.userCourseMapping?.user_lsp_id,
        courseId: userCourseMapData?.userCourseMapping?.course_id,
        addedBy: userCourseMapData?.userCourseMapping?.added_by,
        courseType: userCourseMapData?.userCourseMapping?.course_type,
        isMandatory: userCourseMapData?.userCourseMapping?.is_mandatory,
        endDate: userCourseMapData?.userCourseMapping?.end_date,
      };

      // console.log(sendUserCourseData);
      const res = await updateUserCourse({ variables: sendUserCourseData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Course Assign Update Error' });
      });
      console.log(res);
      if (res?.data?.updateUserCourse)
        userCourseMapData.userCourseMapping = res?.data?.updateUserCourse || {};
    }

    for (let i = 0; i < userCourseMapData?.allModules?.length; i++) {
      const mod = userCourseMapData?.allModules[i];

      for (let j = 0; j < mod?.topicData.length; j++) {
        const topic = mod?.topicData[j];
        // if (topic?.type !== 'Content') continue;

        const topicProgress = userCourseMapData?.userCourseProgress?.filter(
          (obj) => obj?.topic_id === topic?.id,
        );
        // console.log(topicProgress);
        if (topicProgress?.length !== 0) {
          if (topicProgress[0]?.topic_id === videoData?.topicContent[0]?.topicId) {
            const vidDur = videoElement?.current?.duration;
            const startProgress = +topicProgress[0]?.video_progress;

            if (+bookmarkStartTime?.time && !isNaN(+bookmarkStartTime?.time)) {
              const bookmarkTime = +bookmarkStartTime?.time;

              videoElement.current.currentTime = bookmarkTime;
              setPlayerState({ ...playerState, progress: bookmarkTime });
              setBookmarkStartTime({
                ...bookmarkStartTime,
                topicId: null,
                time: null,
                isClickedWhenPlayerOn: null,
              });
            } else if (startProgress < 98) {
              videoElement.current.currentTime = (vidDur * startProgress) / 100;
              setPlayerState({ ...playerState, progress: startProgress });
            }
          }
          continue;
        }

        const { currentTime, duration } = videoElement.current;
        const sendData = {
          userId: userData.id,
          userCourseId: userCourseMapData?.userCourseMapping?.user_course_id,
          topicId: topic?.id,
          topicType: topic?.type,
          status: 'not-started',
          videoProgress: '',
          timestamp: topic?.type !== 'Content' ? `${currentTime}-${duration}` : '',
        };
        if (topic?.id === videoData?.topicContent[0]?.topicId) {
          sendData.status = 'in-progress';
          sendData.videoProgress = playerState?.progress?.toString();
        }

        if (
          userCourseMapData?.userCourseProgress?.filter((cp) => cp?.topic_id === topic?.id)
            ?.length > 0
        )
          continue;

        console.log(sendData);
        const progressRes = await addUserCourseProgress({ variables: sendData }).catch((err) => {
          console.log(err);
          return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
        });
        const userCourseProgressData = progressRes?.data?.addUserCourseProgress[0];
        if (userCourseProgressData)
          userCourseMapData.userCourseProgress.push(userCourseProgressData);
      }
    }

    setUserCourseData({ ...userCourseData, ...userCourseMapData });
  }, [videoElement?.current?.duration]);

  // create and update user course progress
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    if (videoData?.isPreview) return;
    if (!userCourseData?.userCourseMapping?.user_course_id) return;

    if ([0, 100].includes(+playerState?.progress)) return syncVideoProgress();
    if (syncProgressInSeconds > 0) return setSyncProgressInSeconds(syncProgressInSeconds - 1);

    syncVideoProgress();
    setSyncProgressInSeconds(SYNC_DATA_IN_SECONDS * 3);
  }, [playerState?.progress]);

  // sync data when video is paused
  useEffect(() => {
    if (!playerState?.isPlaying) syncVideoProgress();
  }, [playerState?.isPlaying]);

  async function syncVideoProgress(type) {
    if (dataSyncing) return;
    setDataSyncing(true);
    if (!userCourseData?.userCourseMapping?.user_course_id) return setDataSyncing(false);

    const userCourseMapData = structuredClone(userCourseData);
    const currentProgressIndex = userCourseMapData?.userCourseProgress?.findIndex(
      (obj) => obj?.topic_id === videoData?.topicContent[0]?.topicId,
    );
    // TODO: what to do if no progress found?
    if (currentProgressIndex < 0) return setDataSyncing(false);

    const currentTopicProgress = userCourseMapData?.userCourseProgress[currentProgressIndex];

    let isCompleted = currentTopicProgress?.status === 'completed';
    if (type === 'binge') isCompleted = true;
    if (!isCompleted) {
      isCompleted = playerState?.progress === 100;

      if (+currentTopicProgress?.video_progress > +playerState?.progress)
        // return console.log('progress saved is greater');
        return setDataSyncing(false);
    }

    if (isCompleted) {
      isCompleted = isTopicQuizCompleted(currentTopicProgress?.topic_id, quizProgressData);
    }

    // const { currentTime, duration } = videoElement.current;
    const currentTime = videoElement?.current?.currentTime;
    const duration = videoElement?.current?.duration;
    const sendData = {
      userCpId: currentTopicProgress?.user_cp_id,
      userId: userData.id,
      userCourseId: userCourseMapData?.userCourseMapping?.user_course_id,
      topicId: currentTopicProgress?.topic_id,
      topicType: 'Content',
      status: isCompleted ? 'completed' : 'in-progress',
      videoProgress:
        type === 'binge' ? '100' : limitValueInRange(playerState?.progress, 0, 100).toString(),
      timestamp: `${currentTime}-${duration}`,
    };

    // console.log('course progress', sendData);
    const progressRes = await updateUserCourseProgress({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
    });
    const userCourseProgressData = progressRes?.data?.updateUserCourseProgress;

    userCourseMapData.userCourseProgress[currentProgressIndex] = userCourseProgressData;
    if (isCompleted) {
      userCourseMapData.activeModule = { index: null, id: null };
      userCourseMapData.activeTopic = { index: null, id: null };
      userCourseMapData.activeTopicContent = { index: null, id: null };
      userCourseMapData.activeTopicSubtitle = { index: null, id: null };
    }
    if (type !== 'binge') setDataSyncing(false);
    setUserCourseData({ ...userCourseData, ...userCourseMapData });
  }

  // to show errors
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    if (updateUserCourseErr) setToastMsg({ type: 'danger', message: 'Course Assign Update Error' });
    if (addUserCourseProgressErr)
      setToastMsg({ type: 'danger', message: 'Course Progress Add Error' });
    if (updateUserCourseProgressErr)
      setToastMsg({ type: 'danger', message: 'Course Progress Update Error' });
  }, [updateUserCourseErr, addUserCourseProgressErr, updateUserCourseProgressErr]);

  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    if (userCourseData?.triggerPlayerToStartAt === null) setVideoTime(0);
    videoElement.current?.focus();
    updateIsPlayingTo(true);
  }, [videoElement.current]);

  // hide control bar if no mouse movement for 2.5 sec
  const duration = 2500;
  let timeout;
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    clearTimeout(timeout);

    function switchControls(value) {
      if (freezeScreen) return;

      setHideControls(value);
      setHideTopBar(value);
    }

    const callBackFuncArr = [
      {
        event: 'mousemove',
        callback: () => {
          if (videoData.type !== 'mp4') return;
          switchControls(0);
          clearTimeout(timeout);
          timeout = setTimeout(() => switchControls(1), duration);
        },
      },
      {
        event: 'keydown',
        callback: () => {
          if (videoData.type !== 'mp4') return;
          switchControls(0);
          clearTimeout(timeout);
        },
      },
      {
        event: 'click',
        callback: () => {
          if (videoData.type !== 'mp4') return;
          switchControls(0);
          clearTimeout(timeout);
        },
      },
    ];

    if (freezeScreen) return addCallbackToEvent(videoContainer.current, callBackFuncArr, true);

    addCallbackToEvent(videoContainer.current, callBackFuncArr);
  }, [freezeScreen]);

  // reset tooltip and seek after timeoutSeconds
  // const timeoutSeconds = 2000;
  // useEffect(() => {
  //   if (videoData?.type !== 'mp4') return;
  //   if (!videoData.videoSrc && !videoData.type) return;
  //   setTimeout(() => {
  //     setSeek(0);
  //   }, timeoutSeconds);
  // }, [seek]);

  // reset progress when video changes
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;

    if (playerState.progress > 0 && userCourseData?.triggerPlayerToStartAt === null)
      setVideoTime(0);
    if (!playerState.isPlaying) togglePlay();
  }, [videoData.videoSrc]);

  // show/hide controls based on type (show only for mp4)
  useEffect(() => {
    if (videoData.type === null) return setVideoTime(0);
    // if (videoData.type !== 'mp4') return setHideControls(1);
  }, [videoData.type]);

  // reset playpause to null after few seconds
  useEffect(() => {
    // if (videoData?.type !== 'mp4') return;
    clearTimeout(timeout);
    const timeout = setTimeout(() => {
      setPlayPauseActivated(null);
    }, 1000);
  }, [playPauseActivated]);

  // play video on state update
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    playerState.isPlaying ? videoElement.current?.play() : videoElement.current?.pause();

    if (playerState.isPlaying) setFreezeScreen(false);
  }, [playerState.isPlaying, videoElement]);

  // volume = 0 is mute, volume > 0 is unmute
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    if (playerState.volume <= 0 && !playerState.isMuted) return toggleMute();
    if (playerState.volume > 0 && playerState.isMuted) return toggleMute();
  }, [playerState.volume]);

  // TODO : Change this to Ref OR change entire input range to DIV
  // progress bar color update on video play
  useEffect(() => {
    if (videoData?.type !== 'mp4') return;
    let percent = videoElement?.current?.currentTime / videoElement?.current?.duration;
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.style.setProperty('--progressPosition', percent);
  }, [playerState.progress]);

  useEffect(async () => {
    if (!videoElement?.current?.duration) return;
    const ImgPreviews = await generateVideoThumbnails(
      videoData,
      THUMBNAIL_GAP,
      videoElement?.current?.duration,
    );
    setPreviewImages(ImgPreviews);
  }, [videoElement?.current?.duration]);

  // keyboard events
  function handleKeyDownEvents(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === 'Space') {
      togglePlay();
      return;
    }
    if (e.code === 'KeyR' && e.shiftKey) {
      reloadVideo();
      return;
    }
    if (e.code === 'KeyN' && e.shiftKey) {
      playNextVideo();
      return;
    }
    if (e.code === 'KeyP' && e.shiftKey) {
      playPreviousVideo();
      return;
    }
    if (e.code === 'KeyF') {
      toggleFullScreen();
      return;
    }
    if (e.code === 'KeyM') {
      toggleMute();
      return;
    }

    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      updateVolumeValue(e.code === 'ArrowUp');
      return;
    }

    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
      moveVideoProgress(e.code === 'ArrowRight');
      return;
    }
  }

  function isTopicQuizCompleted(topicId, quizProgress) {
    const isCompleted = !quizData
      ?.filter((quiz) => quiz?.topicId === topicId)
      ?.some((quiz) => {
        const isAttempted = quizProgress?.find((qp) => qp?.quiz_id === quiz?.id);
        return !isAttempted;
      });

    return isCompleted;
  }

  function handleMouseMove(e) {
    if (!videoElement.current) return;

    // this width is set in scss
    const elemWidth = 175;

    const timelineContainer = document.getElementById('timelineContainer');
    // const rect = e.target.getBoundingClientRect();
    const rect = timelineContainer.getBoundingClientRect();

    const minPosition = e.pageX < elemWidth / 2 ? elemWidth / 2 : e.pageX - rect.x;
    const maxPosition = rect.width - e.pageX < elemWidth ? rect.width - elemWidth / 2 : rect.width;
    let percent = Math.min(Math.max(0, minPosition), maxPosition) / rect.width;

    var videoDuration = videoElement.current?.duration;

    // getting count of preview images as it could vary
    const previewImgNumber = Math.max(1, Math.floor((percent * videoDuration) / THUMBNAIL_GAP));
    const previewImg = document.getElementById('thumbnailImages');
    previewImg.setAttribute('src', previewImages[previewImgNumber] || '/images/gif/loading.gif');
    timelineContainer.style.setProperty('--previewPosition', percent);

    const timestamp = (e.pageX / screen.width) * videoDuration;

    // for time display below thumb image
    const timeObj = secondsToHMS(timestamp);
    // if (isNaN(timeObj.minute) && isNaN(timeObj.second)) return;
    // setSeek(`${timeObj.minute} : ${timeObj.second}`);
    setSeek(timeObj);

    if (isScrubbing) {
      e.preventDefault();
      percent = Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
      timelineContainer.style.setProperty('--progressPosition', percent);
    }

    return percent;
  }

  function toggleScrubbing(e) {
    const percent = handleMouseMove(e);
    const _isScrubbing = (e.buttons & 1) === 1;
    setIsScrubbing(_isScrubbing);
    // Web dev simplified - youtube video player
    if (_isScrubbing) {
      updateIsPlayingTo(false);
    } else {
      const manualChange = Number(Math.floor(percent * 100));
      setVideoTime(manualChange);
      updateIsPlayingTo(true);
    }
  }
  function handleMouseExit(e) {
    setSeek(0);
    setIsScrubbing(0);
  }

  function updateVolumeValue(isIncrement) {
    let vol = playerState.volume - 0.1;
    if (isIncrement) vol = playerState.volume + 0.1;

    if (vol > 1) vol = 1;
    if (vol < 0) vol = 0;

    setPlayPauseActivated(isIncrement ? 'volumeUp' : 'volumeDown');
    setPlayerState({
      ...playerState,
      volume: vol,
    });
    videoElement.current.volume = vol;
  }

  function togglePlay(state) {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });

    setPlayPauseActivated(!playerState.isPlaying ? 'play' : 'pause');
  }

  async function setExamView(isNext = true) {
    set(false);

    const { allModuleTopic, currentTopicIndex, currentModuleId, allModuleOptions } = videoData;
    const topic = allModuleTopic[currentTopicIndex + (isNext ? 1 : -1)];
    const topicExam = await loadQueryDataAsync(GET_TOPIC_EXAMS, { topic_id: topic.id }).then(
      (res) => res.getTopicExams[0],
    );

    if (!topicExam)
      return setToastMsg({ type: 'danger', message: `No exam added for topic: ${topic.name}` });

    // reset recoil and set new data
    updateVideoData(getVideoObject({ setNewModule: videoData?.setNewModule }));
    setTopicExamData({
      id: topicExam.id,
      topicId: topicExam.topicId,
      courseId: topicExam.courseId,
      examId: topicExam.examId,
      language: topicExam.language,
      currentModule: allModuleOptions?.find((mod) => mod.value === currentModuleId) || {},
      currentTopic: topic,
    });
  }

  async function playNextVideo(type = null, isScorm = false) {
    if (!isScorm) await syncVideoProgress(type);
    if (!videoData.allModuleTopic) return;

    const { allModuleTopic, currentTopicIndex } = videoData;

    if (allModuleTopic[currentTopicIndex + 1]?.type === 'Assessment') {
      return await setExamView();
    }

    // switch to next module
    if (videoData.allModuleTopic.length === videoData.currentTopicIndex + 1) {
      const isBinge = type === 'binge';
      if (isBinge) return;

      const { setNewModule, allModuleOptions, currentModuleIndex } = videoData;
      if (currentModuleIndex + 1 === allModuleOptions.length) return;
      setNewModule({
        ...allModuleOptions[currentModuleIndex + 1],
        isVideoControlClicked: !isBinge,
      });
      return;
    }

    const topicId = videoData.allModuleTopic[videoData.currentTopicIndex + 1].id;
    const filteredTopicContent = filterTopicContent(topicContent, topicId);
    const isTopicContentPresent = filteredTopicContent.length > 0;

    updateVideoData({
      ...videoData,
      videoSrc: isTopicContentPresent ? filteredTopicContent[0].contentUrl : null,
      type: isTopicContentPresent ? filteredTopicContent[0].type : null,
      currentTopicIndex: videoData.currentTopicIndex + 1 || 0,
      topicContent: filteredTopicContent,
      allModuleTopic: videoData.allModuleTopic,
      currentTopicContentIndex: 0,
    });

    setVideoTime(0);
    setPlayPauseActivated('next');
    // togglePlay();
  }

  async function playPreviousVideo() {
    await syncVideoProgress();
    if (!videoData.allModuleTopic) return;

    const { allModuleTopic, currentTopicIndex } = videoData;

    if (allModuleTopic[currentTopicIndex - 1]?.type === 'Assessment') {
      return await setExamView(false);
    }

    // switch to previous module
    if (videoData.currentTopicIndex === 0) {
      const { setNewModule, allModuleOptions, currentModuleIndex } = videoData;
      if (currentModuleIndex === 0) return;
      setNewModule({ ...allModuleOptions[currentModuleIndex - 1], isVideoControlClicked: true });
      return;
    }

    const topicId = videoData.allModuleTopic[videoData.currentTopicIndex - 1].id;
    const filteredTopicContent = filterTopicContent(topicContent, topicId);
    const isTopicContentPresent = filteredTopicContent.length > 0;
    updateVideoData({
      ...videoData,
      videoSrc: isTopicContentPresent ? filteredTopicContent[0].contentUrl : null,
      type: isTopicContentPresent ? filteredTopicContent[0].type : null,
      currentTopicIndex: videoData.currentTopicIndex - 1 || 0,
      topicContent: filteredTopicContent,
      allModuleTopic: videoData.allModuleTopic,
      currentTopicContentIndex: 0,
    });

    setVideoTime(0);
    setPlayPauseActivated('previous');
    togglePlay();
  }

  // pass true or false
  function updateIsPlayingTo(play) {
    if (playerState?.isPlaying === play) return;

    setPlayerState({ ...playerState, isPlaying: !!play });
    setPlayPauseActivated(!!play ? 'play' : 'pause');
  }

  const handleOnTimeUpdate = () => {
    const currentTime = videoElement.current?.currentTime;
    const progress = (currentTime / videoElement.current?.duration) * 100;

    setPlayerState({
      ...playerState,
      progress: progress || 0,
      timestamp: secondsToHMS(currentTime || 0),
      duration: videoElement.current?.duration,
    });
  };

  function handleVideoProgress(e) {
    const rect = e.target.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
    const manualChange = Number(Math.floor(percent * 100));
    setVideoTime(manualChange);
  }

  function moveVideoProgressBySeconds(seconds) {
    let time = Math.floor(videoElement.current?.currentTime);
    if (!time) return;

    let updatedTime = time + seconds;

    if (videoElement.current?.duration < updatedTime) {
      updatedTime = videoElement.current?.duration - 1;
    }
    if (updatedTime < 0) updatedTime = 0;
    if (!updatedTime) updatedTime = time;

    videoElement.current.currentTime = updatedTime;
    setPlayerState({
      ...playerState,
      progress: updatedTime,
    });
  }

  function setVideoTime(time) {
    setPlayerState({
      ...playerState,
      progress: time,
    });
    if (!videoElement.current) return;

    videoElement.current.currentTime = (videoElement.current?.duration / 100) * time || 0;
  }

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  function toggleMute() {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });

    setPlayPauseActivated(!playerState.isMuted ? 'mute' : 'unmute');
  }

  function reloadVideo() {
    setVideoTime(0);
    setPlayPauseActivated('reload');
  }

  function moveVideoProgress(isForward) {
    let time = Math.floor(videoElement.current?.currentTime);

    if (isForward) {
      time += 10;
      if (videoElement.current?.duration < time) {
        time = videoElement.current?.duration - 1;
      }
    } else {
      time -= 10;
      if (time < 0) time = 0;
    }

    if (videoElement.current) videoElement.current.currentTime = time;
    setPlayerState({
      ...playerState,
      progress: time,
    });

    setPlayPauseActivated(isForward ? 'forward' : 'backward');

    // postion is not accurate
    const tooltipPos = (time / videoElement.current.duration) * screen.width;
    // setTooltipPosition(tooltipPos);

    const timeObj = secondsToHMS(time);
    // if (isNaN(timeObj.minute) && isNaN(timeObj.second)) return;
    setSeek(timeObj);
  }

  /* View in fullscreen */
  function openFullscreen(elem) {
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  // fix fullscreen issue
  function toggleFullScreen(e) {
    if (e?.type === 'dblclick' && !e?.target?.className?.includes('videoElement')) return;

    if (!document.fullscreenElement) {
      // videoContainer.current?.requestFullscreen();
      openFullscreen(videoContainer.current);
    } else {
      // document.exitFullscreen();
      closeFullscreen();
    }

    setPlayPauseActivated(!document.fullscreenElement ? 'enterFullScreen' : 'exitFullScreen');
  }

  function handleVolume(e) {
    const volume = parseFloat(e.target.value);
    if (!videoElement?.current) return;

    setPlayerState({
      ...playerState,
      volume: volume,
    });
    videoElement.current.volume = volume;
  }

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    reloadVideo,
    moveVideoProgress,
    handleVolume,
    toggleFullScreen,
    updateIsPlayingTo,
    playPauseActivated,
    setPlayPauseActivated,
    handleKeyDownEvents,
    hideControls,
    hideTopBar,
    handleMouseExit,
    handleMouseMove,
    toggleScrubbing,
    seek,
    tooltip,
    playNextVideo,
    playPreviousVideo,
    setVideoTime,
    moveVideoProgressBySeconds,
    freezeScreen,
    setFreezeScreen,
  };
}
