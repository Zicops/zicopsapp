import Spinner from '@/components/common/Spinner';
import { truncateToN } from '@/helper/common.helper';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
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
  TopicQuizAtom,
  activeCourseTabNames,
} from '../../atoms/learnerCourseComps.atom';
import VideoPlayer from '../../common/VideoPlayer';
import ZicopsButton from '../../common/ZicopsButton';
import styles from '../../learnerCourseComps.module.scss';
import CourseHeroTopBar from '../CourseHeroTopBar';
import TopBarCenterTitle from '../CourseHeroTopBar/TopBarCenterTitle';
import IconButtonWithBox from './IconButtonWithBox';
import ResourcesList from './ResourcesList';
import SkipButtons from './SkipButtons';
import SubtitleBox from './SubtitleBox';

export default function TopicContentPreview() {
  const [courseActiveTab, setCourseActiveTab] = useRecoilState(CourseActiveTabAtom);
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const quizData = useRecoilValue(TopicQuizAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(topicData?.moduleId));

  const { activeBox, videoState, getVideoData, toggleActiveBox, closePlayer } =
    useHandleTopicView();
  const {
    containerRef,
    selectedTopicContent,
    videoStartTime,
    handleNextClick,

    showSkipIntroButton,
    handleSkipIntroClick,

    showBingeButton,
    handleWatchCreditClick,
  } = useHandleTopicProgress(videoState);
  const { isLoading } = useLoadTopicData(activeCourseData?.topicId, topicData?.type);

  const toolbarItems = useMemo(
    () => [
      {
        id: 0,
        btnImg: '/images/svg/spatial_audio_off.svg',
        handleClick: () => toggleActiveBox(0),
        boxComponent: <SubtitleBox closeBox={() => toggleActiveBox(null)} />,
      },
      {
        id: 1,
        btnImg: '/images/svg/hub.svg',
        handleClick: () => toggleActiveBox(1),
        boxComponent: <ResourcesList />,
      },
      {
        id: 2,
        btnImg: '/images/svg/forum.svg',
        handleClick: () => setCourseActiveTab(activeCourseTabNames.discussion),
      },
      {
        id: 3,
        btnImg: '/images/svg/bookmark-line.svg',
        handleClick: () => toggleActiveBox(3),
        boxComponent: <>Subtitle</>,
      },
      {
        id: 4,
        btnImg: '/images/svg/app_registration.svg',
        handleClick: () => toggleActiveBox(4),
        boxComponent: <>Resoucrs</>,
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
                  // const isAttempted = quizAttempts?.filter((qa) => qa?.quizId === quiz?.id);
                  // console.info(isAttempted, quizAttempts, quiz);
                  return (
                    <>
                      <ZicopsButton paddingY="0.5em" display={truncateToN(quiz?.name, 16)} />
                    </>
                  );
                })}
            </div>
          </>
        ),
      },
    ],
    [activeCourseData?.topicId],
  );

  if (isLoading) return <Spinner />;

  return (
    <>
      <div ref={containerRef} className={styles.courseHeroContainer}>
        <CourseHeroTopBar
          handleBackBtnClick={closePlayer}
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

        <VideoPlayer
          containerRef={containerRef}
          videoData={{
            src: selectedTopicContent?.contentUrl || '',
            isAutoPlay: true,
            pauseVideo: videoState?.shouldPlay,
            startFrom: videoStartTime,
            isSubtitleShown: activeCourseData?.subTitle != null,
            subtitleUrl: activeCourseData?.subTitle,
            handleNextClick: handleNextClick,
          }}
          getVideoData={getVideoData}
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
      </div>
    </>
  );
}
