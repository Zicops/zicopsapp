import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { filterModule } from '../../../helper/data.helper';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { VideoAtom } from '../../../state/atoms/video.atom';
import { courseContext } from '../../../state/contexts/CourseContext';
import styles from '../customVideoPlayer.module.scss';
import DraggableDiv from '../DraggableDiv';
import { BOX } from '../Logic/customVideoPlayer.helper';
import useSaveData from '../Logic/useSaveData';
import Bookmark from './Bookmark';
import ButtonWithBox from './ButtonWithBox';
import Notes from './Notes';
import Quiz from './Quiz';
import SubtitleBox from './SubtitleBox';

export default function UiComponents({
  refs,
  updateIsPlayingTo,
  set,
  playerState,
  isTopBarHidden,
  styleClass,
  moveVideoProgressBySeconds,
  subtitleState
}) {
  const { videoElement, videoContainer } = refs;
  const videoData = useRecoilValue(VideoAtom);
  const moduleData = useRecoilValue(ModuleAtom);
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);
  const { fullCourse } = useContext(courseContext);
  const [isToolbarOpen, setIsToolbarOpen] = useState(null);

  const {
    showBox,
    setShowBox,
    switchBox,
    states,
    toggleStates,
    handleBookmarkChange,
    bookmarkData,
    handleSaveBookmark,
    notes,
    handleNotesChange,
    handleSaveNotes
  } = useSaveData(videoElement);

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

  useEffect(() => {
    // TODO: remove later
    // return;

    if (isTopBarHidden) setShowBox(null);
  }, [isTopBarHidden]);

  const toolbarItems = [
    {
      id: 0,
      btnImg: '/images/4019936_2.png',
      boxComponent: <SubtitleBox subtitleState={subtitleState} />,
      handleClick: () => switchBox(0)
    },
    {
      id: 1,
      btnImg: '/images/pot-plant-icon.png',
      handleClick: () => switchBox(1)
    },
    {
      id: 2,
      btnImg: '/images/conversation-icon-png-clipart2.png',
      handleClick: () => switchBox(2)
    },
    {
      id: 3,
      btnComp: (
        <div
          className={`${styles.videoBookmark}`}
          onClick={(e) => {
            e.stopPropagation();
            switchBox(3);
            if (playerState?.isPlaying) updateIsPlayingTo(false);
          }}></div>
      ),
      boxComponent: (
        <Bookmark
          handleChange={handleBookmarkChange}
          value={bookmarkData?.title}
          handleSave={() => handleSaveBookmark(playerState.progress)}
          updateIsPlayingTo={updateIsPlayingTo}
          playerState={playerState}
        />
      ),
      handleClick: () => {
        switchBox(3);
        if (playerState?.isPlaying) updateIsPlayingTo(false);
      }
    },
    {
      id: 4,
      btnImg: '/images/Notes Icon2.png',
      boxComponent: <Notes />,
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
          <button
            onClick={() => {
              updateIsPlayingTo(false);
              toggleStates(setShowQuiz, showQuiz);
              toggleStates(setShowQuizDropdown, setShowQuizDropdown);
            }}>
            Quiz 1
          </button>
          <button
            onClick={() => {
              updateIsPlayingTo(false);
              toggleStates(setShowQuiz, showQuiz);
              toggleStates(setShowQuizDropdown, setShowQuizDropdown);
            }}>
            Quiz 2
          </button>
        </div>
      ),
      handleClick: () => () => {
        updateIsPlayingTo(false);
        toggleStates(setShowQuiz, showQuiz);
        toggleStates(setShowQuizDropdown, setShowQuizDropdown);
      }
    }
  ];
  return (
    <>
      <DraggableDiv initalPosition={{ x: '0px', y: '0px' }}>
        <div className={`${styles.toolbar}`} onClick={() => setIsToolbarOpen(!isToolbarOpen)}>
          <span>Toolbar</span>

          <div className={`${styles.toolbarBox}`}>
            {isToolbarOpen &&
              toolbarItems.map((item) => {
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

      <div className={`${styles.customUiContainer} ${styleClass}`}>
        <div className={`${styles.topIconsContainer}`}>
          {/* back button on left which close the player and return to hero */}
          <div className={`${styles.firstIcon}`} onClick={playerClose}>
            <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
          </div>

          {!videoData.isPreview && (
            <div className={`${styles.leftIcons}`}>
              {toolbarItems.slice(0, 3).map((item) => {
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
            <div className={`${styles.centerTextHeading}`}>{truncateToN(fullCourse?.name, 60)}</div>
            <div className={`${styles.centerTextSubheading}`}>
              {truncateToN(courseTopicName, 80)}
            </div>
          </div>

          {!videoData.isPreview && (
            <div className={`${styles.rightIcons}`}>
              {toolbarItems.slice(3, toolbarItems.length).map((item) => {
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

      {showQuiz && (
        <Quiz
          playerClose={playerClose}
          handleSkip={() => {
            moveVideoProgressBySeconds(-1);
            updateIsPlayingTo(true);
            toggleStates(setShowQuiz, showQuiz);
          }}
          handleSubmit={() => {
            moveVideoProgressBySeconds(-1);
            updateIsPlayingTo(true);
            toggleStates(setShowQuiz, showQuiz);
          }}
        />
      )}
    </>
  );
}
