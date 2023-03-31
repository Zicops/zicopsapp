import { ActiveCourseTabAtom } from '@/components/CourseBody/Logic/courseBody.helper';
import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { userContext } from '@/state/contexts/UserContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { filterModule } from '../../../helper/data.helper';
import { ModuleAtom, QuizAtom } from '../../../state/atoms/module.atoms';
import { QuizProgressDataAtom, VideoAtom } from '../../../state/atoms/video.atom';
import { courseContext } from '../../../state/contexts/CourseContext';
import styles from '../customVideoPlayer.module.scss';
import DraggableDiv from '../DraggableDiv';
import { BOX } from '../Logic/customVideoPlayer.helper';
import useSaveData from '../Logic/useSaveData';
import Bookmark from './Bookmark';
import ButtonWithBox from './ButtonWithBox';
import Notes from './Notes';
import Quiz from './Quiz';
import ResourcesList from './ResourcesList';
import SubtitleBox from './SubtitleBox';

export default function UiComponents({
  refs,
  updateIsPlayingTo,
  set,
  playerState,
  isTopBarHidden,
  styleClass,
  moveVideoProgressBySeconds,
  subtitleState,
  freezeState
}) {
  const router = useRouter();
  const isPreview = router?.asPath?.includes('preview');

  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabAtom);
  const { videoElement, videoContainer } = refs;
  const { bookmarkData: allBookmarks } = useContext(userContext);
  const videoData = useRecoilValue(VideoAtom);
  const moduleData = useRecoilValue(ModuleAtom);
  const quizData = useRecoilValue(QuizAtom);
  const quizProgressData = useRecoilValue(QuizProgressDataAtom);
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);
  const { fullCourse } = useContext(courseContext);
  const [isToolbarOpen, setIsToolbarOpen] = useState(null);

  const [freezeScreen, setFreezeScreen] = freezeState;

  const {
    showBox,
    setShowBox,
    switchBox,
    states,
    toggleStates,
    handleBookmarkChange,
    bookmarkData,
    setBookmarkData,
    handleSaveBookmark,
    notes,
    handleNotesChange,
    handleSaveNotes,
    isBookMarkDisable
  } = useSaveData(videoElement, freezeState);

  const { setShowQuizDropdown, showQuiz, setShowQuiz } = states;
  const playerClose = () => set(false);

  const activeModule = filterModule(moduleData, videoData.currentModuleId);
  const currentTopic = videoData?.allModuleTopic
    ? videoData?.allModuleTopic[videoData?.currentTopicIndex]
    : null;
  const displaySequence = `M${activeModule?.sequence || 0}T${currentTopic?.sequence || 0}`;
  const courseTopicName = videoData.isPreview
    ? 'Preview Video'
    : `${displaySequence} ${currentTopic?.name || ''}`;

  // useEffect(() => {
  //   setShowLanguageSubtitles(false);
  // }, [videoData.videoSrc]);

  // To play quizzes automatically
  useEffect(() => {
    const topicId = videoData?.topicContent[0]?.topicId;
    const quizLoop = getTopicQuizes(quizData, topicId);
    quizLoop.forEach((quiz) => {
      if (quiz.startTime === Math.floor(videoElement?.current?.currentTime)) {
        updateIsPlayingTo(false);
        setShowQuiz(quiz);
      }
    });
  }, [playerState?.progress]);

  // To show bookmark B in timeline
  useEffect(() => {
    if (!allBookmarks) return;
    if (!videoElement?.current?.duration) return;
    allBookmarks
      ?.filter((bookmark) => bookmark?.topic_id === videoData?.topicContent[0]?.topicId)
      ?.forEach((bm) => {
        let bookmarkTime = bm?.time_stamp?.split(':');
        let bookmarkTimeInSecs = +bookmarkTime[0] * 60 + +bookmarkTime[1];
        showThumbnailPointsInProgressbar(bookmarkTimeInSecs, 'bookmarkIndicator');
      });
  }, [allBookmarks, videoData?.videoSrc, videoElement?.current?.duration]);

  // To show quiz Q in timeline
  useEffect(() => {
    const topicId = videoData?.topicContent[0]?.topicId;
    const quizLoop = getTopicQuizes(quizData, topicId);
    quizLoop.forEach((quiz) => {
      showThumbnailPointsInProgressbar(quiz.startTime, 'quizIndicator');
    });
  }, [videoData?.videoSrc, videoElement?.current?.duration]);

  async function showThumbnailPointsInProgressbar(videoTimeInSeconds, indicator) {
    let percent = (videoTimeInSeconds / videoElement?.current?.duration) * 100;
    if (!percent) return;
    let thumbPoints = document.getElementById(indicator);
    let thumbSpan = document.createElement('span');
    thumbSpan.style.left = percent + '%';
    thumbPoints.appendChild(thumbSpan);
  }
  function getTopicQuizes(quizData, topicId) {
    return quizData?.filter((quiz) => quiz?.topicId === topicId) || [];
  }

  useEffect(() => {
    if (playerState?.isPlaying) setShowBox(null);
    if (isTopBarHidden) setShowBox(null);
  }, [isTopBarHidden, playerState?.isPlaying]);

  useEffect(() => {
    setShowQuiz(null);
  }, [videoData?.type, videoData?.videoSrc]);

  const toolbarItems = [
    {
      id: 0,
      btnImg: '/images/svg/spatial_audio_off.svg',
      boxComponent: (
        <SubtitleBox subtitleState={subtitleState} isSubtitleDisplay={videoData?.type === 'mp4'} />
      ),
      handleClick: () => switchBox(0),
      isHidden: videoData?.type === 'classroom'
    },
    {
      id: 1,
      btnImg: '/images/svg/hub.svg',
      handleClick: () => switchBox(1),
      boxComponent: (
        <ResourcesList isPlaying={playerState.isPlaying} updateIsPlayingTo={updateIsPlayingTo} />
      )
    },
    {
      id: 2,
      btnImg: '/images/svg/forum.svg',
      handleClick: () => setActiveCourseTab('Discussion'),
      isHidden: videoData?.type === 'classroom'
    },
    {
      id: 3,
      isHidden: videoData?.type !== 'mp4',
      isDisabled: isPreview,
      btnComp: (
        <div
          className={`${styles.videoBookmark}`}
          onClick={(e) => {
            if (isPreview) return;
            e.stopPropagation();
            switchBox(3);
            updateIsPlayingTo(false);
          }}></div>
      ),
      boxComponent: (
        <Bookmark
          freezeState={freezeState}
          bookmarkState={[bookmarkData, setBookmarkData]}
          handleSave={async () => {
            if (isPreview) return;
            await handleSaveBookmark();
            updateIsPlayingTo(true);
          }}
          updateIsPlayingTo={updateIsPlayingTo}
          playerState={playerState}
          submitIsDisable={isBookMarkDisable}
        />
      ),
      handleClick: () => {
        if (isPreview) return;
        switchBox(3);
        if (playerState?.isPlaying) updateIsPlayingTo(false);
      }
    },
    {
      id: 4,
      btnImg: '/images/svg/app_registration.svg',
      boxComponent: <Notes />,
      isDisabled: isPreview,
      handleClick: () => {
        const isBoxClosed = showBox === BOX[4];
        if (isBoxClosed) {
          // hide the note card which are not pinned
          setFloatingNotes(
            floatingNotes.map((note) => {
              if (note.isPinned) return note;

              return {
                ...note,
                isPinned: false,
                isFloating: false,
                x: null,
                y: null
              };
            })
          );
        }
        updateIsPlayingTo(isBoxClosed);
        switchBox(4);
      }
    },
    {
      id: 5,
      btnComp: (
        <div
          className={`${styles.videoQuiz}`}
          onClick={(e) => {
            e.stopPropagation();
            switchBox(5);
          }}></div>
      ),
      boxComponent: (
        <div className={`${styles.quizDropdown}`}>
          {quizData
            ?.filter((quiz) => quiz?.topicId === videoData?.topicContent[0]?.topicId)
            ?.map((quiz) => {
              const quizAttempts = quizProgressData?.filter((qp) => qp?.quiz_id === quiz?.id) || [];
              const isCompleted = quizAttempts?.find((qp) => qp?.result === 'passed');

              let svgIndex = 0;
              if (!!quizAttempts?.length) svgIndex = 1;
              if (!!isCompleted) svgIndex = 2;
              // let styleClass = '';
              // if (!!quizAttempts?.length) styleClass = styles.wrongQuiz;
              // if (!!isCompleted) styleClass = styles.correctQuiz;

              return (
                <button
                  // className={`${styleClass}`}
                  key={quiz?.quiz_id}
                  onClick={() => {
                    updateIsPlayingTo(false);
                    setShowQuiz(quiz);
                    toggleStates(setShowQuizDropdown, setShowQuizDropdown);
                  }}>
                  <span>
                    {svgIndex === 1 && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                          fill="red"
                        />
                      </svg>
                    )}

                    {svgIndex === 2 && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.80001 15.9L4.60001 11.7L3.20001 13.1L8.80001 18.7L20.8 6.70005L19.4 5.30005L8.80001 15.9Z"
                          fill="green"
                        />
                      </svg>
                    )}
                    {quiz?.name}
                  </span>
                </button>
              );
            })}
          {/* <button
            onClick={() => {
              updateIsPlayingTo(false);
              toggleStates(setShowQuiz, showQuiz);
              toggleStates(setShowQuizDropdown, setShowQuizDropdown);
            }}>
            Quiz 2
          </button> */}
        </div>
      ),
      handleClick: () => () => {
        updateIsPlayingTo(false);
        toggleStates(setShowQuiz, showQuiz);
        toggleStates(setShowQuizDropdown, setShowQuizDropdown);
      },
      isHidden: videoData?.type === 'classroom'
    }
  ];

  return (
    <>
      {/* Static content toolbar */}
      {videoData?.type !== 'mp4' && (
        <DraggableDiv initalPosition={{ x: '0px', y: '0px' }}>
          <div className={`${styles.toolbar}`}>
            <span style={{ padding: '5px' }} onClick={() => setIsToolbarOpen(!isToolbarOpen)}>
              <Image src="/images/svg/catching_pokemon.svg" height={20} width={20} />
            </span>

            <div className={`${styles.toolbarBox}`}>
              {isToolbarOpen &&
                toolbarItems.map((item) => {
                  if (item?.isHidden) return null;

                  return (
                    <ButtonWithBox
                      key={item.id}
                      btnImg={item.btnImg}
                      btnComp={item.btnComp}
                      handleClick={item.handleClick}
                      isBoxActive={showBox === BOX[item.id]}
                      boxComponent={item.boxComponent}
                    />
                  );
                })}
            </div>
          </div>
        </DraggableDiv>
      )}

      <div
        className={`${styles.customUiContainer} ${styleClass}`}
        style={videoData?.type === 'classroom' ? { width: 'fit-content' } : {}}>
        <div className={`${styles.topIconsContainer}`}>
          {/* back button on left which close the player and return to hero */}
          <div
            className={`${styles.firstIcon}`}
            onClick={playerClose}
            style={videoData?.type === 'classroom' ? { minWidth: '50px' } : {}}>
            <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
          </div>

          {videoData?.type === 'mp4' && (
            <>
              {!videoData.isPreview && (
                <div className={`${styles.leftIcons}`}>
                  {toolbarItems.slice(0, 3).map((item) => {
                    if (item?.isHidden) return null;

                    return (
                      <ButtonWithBox
                        key={item.id}
                        btnImg={item.btnImg}
                        btnComp={item.btnComp}
                        handleClick={item.handleClick}
                        isBoxActive={showBox === BOX[item.id]}
                        boxComponent={item.boxComponent}
                      />
                    );
                  })}
                </div>
              )}

              {/* video title */}

              <div className={`${styles.centerText}`}>
                <div className={`${styles.centerTextHeading}`}>
                  {truncateToN(fullCourse?.name, 60)}
                </div>
                <div className={`${styles.centerTextSubheading}`}>
                  {truncateToN(courseTopicName, 80)}
                </div>
              </div>

              {!videoData.isPreview && (
                <div className={`${styles.rightIcons}`}>
                  {toolbarItems.slice(3, toolbarItems.length).map((item) => {
                    if (item?.isHidden) return null;
                    return (
                      <ButtonWithBox
                        key={item.id}
                        btnImg={item.btnImg}
                        btnComp={item.btnComp}
                        isDisabled={item?.isDisabled || false}
                        handleClick={item.handleClick}
                        isBoxActive={showBox === BOX[item.id]}
                        boxComponent={item.boxComponent}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}

          <div className={`${styles.lastIcon}`}></div>
        </div>
      </div>

      {/* <div className={`${styles.bookmarkBtn}`}>
          <button onClick={() => updateIsPlayingToPlay(false)}>Bookmark</button>
        </div> */}
      {/* <div className={`${styles.drawer}`}> */}

      {/* elements which will be activated when user clicks on one of the above btns  */}
      {/* show bookmark input to save bookmarks */}
      {/* {showBookmark && (
        <div className={`${styles.bookmarksInput}`}>
          <input
            className={`${styles.bookmarksField}`}
            type="text"
            placeholder="add bookmark title"
            onChange={handleBookmarkChange}
            value={bookmarkData.title}
          />
          <button
            className={`${styles.bookmarksBtn}`}
            type="submit"
            onClick={() => {
              handleSaveBookmark(playerState.progress);
            }}>
            Save Bookmark
          </button>
        </div>
      )} */}

      {/* <div className={`${styles.NotesInputBox}`}>
            <input
              type="text"
              placeholder="add notes title"
              onChange={handleNotesChange}
              value={notes.title}
              name="title"
            />
            <textarea
              placeholder="add notes"
              onChange={handleNotesChange}
              value={notes.notes}
              name="notes"
            />
            <button
              type="submit"
              onClick={() => {
                handleSaveNotes(playerState.progress);
              }}>
              Save Notes
            </button>
          </div> */}
      {/* <div id="output"></div> */}

      {showQuiz != null && (
        <Quiz
          isTopBarHidden={isTopBarHidden}
          playerClose={playerClose}
          currentQuizData={showQuiz}
          handleSkip={() => {
            moveVideoProgressBySeconds(1);
            updateIsPlayingTo(true);
            setShowQuiz(null);
          }}
          afterSubmit={() => {
            moveVideoProgressBySeconds(1);
            updateIsPlayingTo(true);
            setShowQuiz(null);
          }}
        />
      )}
    </>
  );
}
