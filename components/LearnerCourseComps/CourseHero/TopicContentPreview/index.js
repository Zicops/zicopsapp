import Spinner from '@/components/common/Spinner';
import { CrossIcon, TickIcon } from '@/components/common/ZicopsIcons';
import { TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { truncateToN } from '@/helper/common.helper';
import { CourseMetaDataAtom, TopicQuizAtom } from '@/state/atoms/courses.atom';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useHandleTopicProgress from '../../Logic/useHandleTopicProgress';
import useHandleTopicView from '../../Logic/useHandleTopicView';
import useLoadTopicData from '../../Logic/useLoadTopicData';
import {
  ActiveCourseDataAtom,
  CourseActiveTabAtom,
  CourseModulesAtomFamily,
  CourseTopicsAtomFamily,
  TopicQuizAttemptsAtom,
  activeCourseTabNames,
} from '../../atoms/learnerCourseComps.atom';
import VideoPlayer from '../../common/VideoPlayer';
import ZicopsButton from '../../common/ZicopsButton';
import styles from '../../learnerCourseComps.module.scss';
import CourseHeroTopBar from '../CourseHeroTopBar';
import TopBarCenterTitle from '../CourseHeroTopBar/TopBarCenterTitle';
import IconButtonWithBox from './IconButtonWithBox';
import Quiz from './Quiz';
import ResourcesList from './ResourcesList';
import SkipButtons from './SkipButtons';
import SubtitleBox from './SubtitleBox';

export default function TopicContentPreview() {
  const [courseActiveTab, setCourseActiveTab] = useRecoilState(CourseActiveTabAtom);
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const quizData = useRecoilValue(TopicQuizAtom);
  const quizAttempts = useRecoilValue(TopicQuizAttemptsAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(topicData?.moduleId));

  const {
    activeBox,
    videoState,
    setVideoState,
    getVideoData,
    toggleActiveBox,
    isTopBottomBarHidden,
    toggleTopBottomBarDisplay,
  } = useHandleTopicView();
  const {
    containerRef,
    selectedTopicContent,
    currentTopicQuiz,
    videoStartTime,
    moveTimeBy,
    setMoveTimeBy,
    handleNextClick,
    handlePreviousClick,

    showSkipIntroButton,
    handleSkipIntroClick,

    showBingeButton,
    handleWatchCreditClick,
    syncTopicProgress,
    closePlayer,

    selectedQuiz,
    setSelectedQuiz,
    handleSelectQuiz,
    handleQuizSubmit,
  } = useHandleTopicProgress(videoState);
  const { isLoading } = useLoadTopicData(activeCourseData?.topicId, topicData?.type);

  const toolbarItems = useMemo(
    () => [
      {
        id: 0,
        btnImg: '/images/svg/spatial_audio_off.svg',
        handleClick: () => toggleActiveBox(0),
        boxComponent: <SubtitleBox closeBox={() => toggleActiveBox(null)} />,
        isHidden: selectedQuiz?.id,
      },
      {
        id: 1,
        btnImg: '/images/svg/hub.svg',
        handleClick: () => toggleActiveBox(1),
        boxComponent: <ResourcesList />,
        isHidden: selectedQuiz?.id,
      },
      {
        id: 2,
        btnImg: '/images/svg/forum.svg',
        handleClick: () => setCourseActiveTab(activeCourseTabNames.discussion),
        isHidden: selectedQuiz?.id,
      },
      {
        id: 3,
        btnImg: '/images/svg/bookmark-line.svg',
        handleClick: () => toggleActiveBox(3),
        boxComponent: <>Subtitle</>,
        isHidden: selectedQuiz?.id,
      },
      {
        id: 4,
        btnImg: '/images/svg/app_registration.svg',
        handleClick: () => toggleActiveBox(4),
        boxComponent: <>Resoucrs</>,
        isHidden: selectedQuiz?.id,
      },
      {
        id: 5,
        btnImg: '/images/svg/quiz.svg',
        handleClick: () => toggleActiveBox(5),
        boxComponent: (
          <>
            <div className={`${styles.boxContainer} ${styles.quizBox}`}>
              {quizData
                ?.filter((quiz) => quiz?.topicId === activeCourseData?.topicId)
                ?.map((quiz) => {
                  const attemptedData = quizAttempts?.filter((qa) => qa?.quiz_id === quiz?.id);
                  const isCorrect = attemptedData?.find((qa) => qa?.result === 'passed');

                  return (
                    <>
                      <ZicopsButton
                        paddingY="0.5em"
                        display={
                          <>
                            {attemptedData?.length > 0 &&
                              (isCorrect ? <TickIcon /> : <CrossIcon />)}{' '}
                            {truncateToN(quiz?.name, 16)}
                          </>
                        }
                        handleClick={() => {
                          handleSelectQuiz(quiz);
                        }}
                      />
                    </>
                  );
                })}
            </div>
          </>
        ),
        isHidden: selectedQuiz?.id,
      },
    ],
    [activeCourseData?.topicId, selectedQuiz?.id],
  );

  const isTypeVideo = selectedTopicContent?.type === TOPIC_CONTENT_TYPES.mp4;
  const isTypeDocument = selectedTopicContent?.type === TOPIC_CONTENT_TYPES.document;
  const isTypeScrom = !isTypeVideo && !isTypeDocument;

  if (isLoading) return <Spinner />;
  console.info(currentTopicQuiz, 'q');
  return (
    <>
      <div ref={containerRef} className={styles.courseHeroContainer}>
        <CourseHeroTopBar
          handleBackBtnClick={() => {
            if (!!selectedQuiz?.id) {
              toggleActiveBox(null);
              return setSelectedQuiz(null);
            }

            closePlayer();
          }}
          isHidden={isTopBottomBarHidden}
          handleMouseEnter={() => toggleTopBottomBarDisplay(null)}
          handleMouseLeave={() => toggleTopBottomBarDisplay(false)}
          leftSideComps={
            <>
              {toolbarItems.slice(0, 3).map((item) => {
                if (item?.isHidden) return null;

                return (
                  <IconButtonWithBox
                    key={item.id}
                    btnImg={item.btnImg}
                    btnComp={item.btnComp}
                    handleClick={item.handleClick}
                    isBoxActive={activeBox === item.id}
                    boxComponent={item.boxComponent}
                  />
                );
              })}
            </>
          }
          rightComps={
            <>
              {toolbarItems.slice(3, 6).map((item) => {
                if (item?.isHidden) return null;

                return (
                  <IconButtonWithBox
                    key={item.id}
                    btnImg={item.btnImg}
                    btnComp={item.btnComp}
                    handleClick={item.handleClick}
                    isBoxActive={activeBox === item.id}
                    boxComponent={item.boxComponent}
                  />
                );
              })}
            </>
          }
          centerComps={
            <TopBarCenterTitle
              title={courseMeta?.name}
              subtitle={`M${moduleData?.sequence || '1'}T${topicData?.sequence || '1'} ${
                topicData?.name || ''
              }`}
            />
          }
        />

        {/* single quiz screen */}
        {!!selectedQuiz?.id && (
          <Quiz
            questionId={selectedQuiz?.questionId}
            handleSkip={() => setSelectedQuiz(null)}
            handleSubmit={handleQuizSubmit}
            onAttemptSuccess={() => {
              setSelectedQuiz(null);
              setMoveTimeBy(1);
              setVideoState((prev) => ({ ...prev, shouldPlay: true }));
            }}
          />
        )}

        {!selectedQuiz?.id && isTypeVideo && (
          <>
            <VideoPlayer
              containerRef={containerRef}
              videoData={{
                src: selectedTopicContent?.contentUrl || '',
                isAutoPlay: true,
                pauseVideo: videoState?.shouldPlay,
                startFrom: videoStartTime,
                moveTimeBy: moveTimeBy,
                isSubtitleShown: activeCourseData?.subTitle != null,
                subtitleUrl: activeCourseData?.subTitle,
                videoDuration: selectedTopicContent?.duration || null,
                handleNextClick,
                handlePreviousClick,
              }}
              controlBarData={{
                isHidden: isTopBottomBarHidden,
                handleMouseEnter: () => toggleTopBottomBarDisplay(null),
                handleMouseLeave: () => toggleTopBottomBarDisplay(false),
                timelineOverlay: (
                  <div className={`${styles.quizBookmarkOverlay}`}>
                    {currentTopicQuiz?.map((quiz) => {
                      const time = +quiz?.startTime || 0;
                      const videoDuration = +selectedTopicContent?.duration || 0;
                      const percent = Math.ceil((time / videoDuration) * 100);

                      return (
                        <span
                          className={`${styles.timelinePill} ${styles.red}`}
                          style={{ left: `${percent}%` }}>
                          Q
                        </span>
                      );
                    })}
                  </div>
                ),
              }}
              getVideoData={getVideoData}
              handleContainerClick={syncTopicProgress}
            />

            {/* skip intro button */}
            {showSkipIntroButton && (
              <SkipButtons
                nextBtnObj={{
                  text: 'Skip Intro',
                  classes: styles.skipIntroBtn,
                  clickHandler: handleSkipIntroClick,
                }}
              />
            )}

            {/* next binge button  */}
            {!!showBingeButton && (
              <SkipButtons
                nextBtnObj={{
                  text: 'Next Topic',
                  classes: styles.nextPlayBtn,
                  clickHandler: () => {
                    if (!handleNextClick) return;

                    handleNextClick();
                  },
                }}
                stayBtnObj={{
                  text: 'Watch Credits',
                  classes: styles.watchCreditsBtn,
                  clickHandler: handleWatchCreditClick,
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
