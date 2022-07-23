import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { filterModule } from '../../../helper/data.helper';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { VideoAtom } from '../../../state/atoms/video.atom';
import { courseContext } from '../../../state/contexts/CourseContext';
import Button from '../Button';
import styles from '../customVideoPlayer.module.scss';
import useSaveData from '../Logic/useSaveData';
import Bookmark from './Bookmark';
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
  const { fullCourse } = useContext(courseContext);

  const {
    showBox,
    setShowBox,
    BOX,
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
    return;

    if (isTopBarHidden) setShowBox(null);
  }, [isTopBarHidden]);

  return (
    <>
      <div className={`${styles.customUiContainer} ${styleClass}`}>
        <div className={`${styles.topIconsContainer}`}>
          {/* back button on left which close the player and return to hero */}
          <div className={`${styles.firstIcon}`} onClick={playerClose}>
            <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
          </div>
          {/* subtitles and language button */}
          {!videoData.isPreview && (
            <div className={`${styles.leftIcons}`}>
              <div className="position-relative">
                <Button>
                  <Image
                    src="/images/4019936_2.png"
                    alt=""
                    height="30px"
                    width="28px"
                    onClick={() => switchBox(0)}
                  />
                </Button>

                {/* subtitle and language element */}
                {showBox === BOX[0] && <SubtitleBox subtitleState={subtitleState} />}
              </div>

              {/* something I dont know, update comment later */}
              <Button>
                <Image
                  src="/images/pot-plant-icon.png"
                  alt=""
                  height="30px"
                  width="30px"
                  onClick={() => switchBox(1)}
                />
              </Button>

              {/* something to do with discussion, update later */}
              <Button>
                <Image
                  src="/images/conversation-icon-png-clipart2.png"
                  alt=""
                  height="30px"
                  width="30px"
                  onClick={() => switchBox(2)}
                />
              </Button>
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
              {/* bookmark btn */}
              <div className={`position-relative`}>
                <Button>
                  <div
                    className={`${styles.videoBookmark}`}
                    onClick={() => {
                      switchBox(3);
                      if (playerState?.isPlaying) updateIsPlayingTo(false);
                    }}></div>
                </Button>

                {showBox === BOX[3] && (
                  <Bookmark
                    handleChange={handleBookmarkChange}
                    value={bookmarkData?.title}
                    handleSave={() => handleSaveBookmark(playerState.progress)}
                    updateIsPlayingTo={updateIsPlayingTo}
                    playerState={playerState}
                  />
                )}
              </div>

              {/* notes btn */}
              <div className={`position-relative`}>
                <Button>
                  <Image
                    src="/images/Notes Icon2.png"
                    alt=""
                    height="25px"
                    width="25px"
                    onClick={() => switchBox(4)}
                  />
                </Button>

                {showBox === BOX[4] && <Notes />}
              </div>

              {/* quiz btn */}
              <div className={`position-relative`}>
                <Button>
                  <div className={`${styles.videoQuiz}`} onClick={() => switchBox(5)}></div>
                </Button>

                {showBox === BOX[5] && (
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
                )}
              </div>
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
