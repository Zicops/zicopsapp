import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { filterModule } from '../../../helper/data.helper';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { VideoAtom } from '../../../state/atoms/video.atom';
import { courseContext } from '../../../state/contexts/CourseContext';
import Button from '../Button';
import styles from '../customVideoPlayer.module.scss';
import useSaveData from '../Logic/useSaveData';
import Quiz from './Quiz';

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
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const moduleData = useRecoilValue(ModuleAtom);
  const { fullCourse } = useContext(courseContext);

  const [showSubtitles, setShowSubtitles] = subtitleState;

  const {
    states,
    toggleStates,
    handleBookmarkChange,
    bookmarkData,
    handleSaveBookmark,
    notes,
    handleNotesChange,
    handleSaveNotes
  } = useSaveData(videoElement);

  const {
    showBookmark,
    setShowBookmark,
    showLanguageSubtitles,
    setShowLanguageSubtitles,
    showQuizDropdown,
    setShowQuizDropdown,
    showQuiz,
    setShowQuiz
  } = states;
  const playerClose = () => set(false);

  const activeModule = filterModule(moduleData, videoData.currentModuleId);
  const currentTopic = videoData?.allModuleTopic
    ? videoData?.allModuleTopic[videoData?.currentTopicIndex]
    : null;
  const displaySequence = `M${activeModule?.sequence || 0}T${currentTopic?.sequence || 0}`;
  const courseTopicName = videoData.isPreview
    ? 'Preview Video'
    : `${displaySequence} ${currentTopic?.name || ''}`;

  useEffect(() => {
    setShowLanguageSubtitles(false);
  }, [videoData.videoSrc]);

  // useEffect(() => {
  //   if (isTopBarHidden) {
  //     setShowBookmark(false);
  //     setShowLanguageSubtitles(false);
  //     setShowQuiz(false);
  //   }
  // }, [isTopBarHidden]);

  const { topicContent, currentTopicContentIndex, currentSubtitleIndex } = videoData;

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
                    onClick={() => {
                      toggleStates(setShowLanguageSubtitles, showLanguageSubtitles);
                    }}
                  />
                </Button>

                {/* subtitle and language element */}
                {showLanguageSubtitles && (
                  <div className={`${styles.languageList}`}>
                    {/* for topic content language  */}
                    <div>
                      <h4>Audio </h4>
                      <section>
                        {videoData?.topicContent &&
                          videoData.topicContent.map((c, i) => (
                            <button
                              key={c.id}
                              className={`${
                                i === videoData.currentTopicContentIndex
                                  ? styles.languageBtnActive
                                  : ''
                              }`}
                              onClick={() => {
                                setVideoData({
                                  ...videoData,
                                  currentTopicContentIndex: i,
                                  videoSrc: videoData.topicContent[i].contentUrl
                                });
                              }}>
                              {c.language}
                            </button>
                          ))}
                      </section>
                    </div>

                    {/* for topic content subtitles */}
                    <div>
                      <h4>
                        Subtitles
                        <SwitchButton
                          styles={{
                            marginLeft: '5px'
                          }}
                          type="antSwitch"
                          color="success"
                          isChecked={showSubtitles}
                          handleChange={() => setShowSubtitles(!showSubtitles)}
                        />
                      </h4>
                      {topicContent &&
                        topicContent[currentTopicContentIndex]?.subtitleUrl?.map((s, i) => (
                          <button
                            key={s.language}
                            className={`${
                              i === currentSubtitleIndex ? styles.languageBtnActive : ''
                            }`}
                            onClick={() => {
                              setVideoData({
                                ...videoData,
                                currentSubtitleIndex: i
                              });
                            }}>
                            {s.language}
                          </button>
                        ))}
                    </div>

                    {(videoData?.topicContent?.length ||
                      topicContent[currentTopicContentIndex]?.subtitleUrl?.length) > 3 && (
                      <div className={`${styles.scrollArrow}`}>
                        <img src="/images/bigarrowleft.png" alt="" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* something I dont know, update comment later */}
              <Button>
                <Image src="/images/pot-plant-icon.png" alt="" height="30px" width="30px" />
              </Button>

              {/* something to do with discussion, update later */}
              <Button>
                <Image
                  src="/images/conversation-icon-png-clipart2.png"
                  alt=""
                  height="30px"
                  width="30px"
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
                      toggleStates(setShowBookmark, showBookmark);
                      updateIsPlayingTo(false);
                    }}></div>
                </Button>

                {showBookmark && (
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
                )}
              </div>

              {/* notes btn */}
              <Button>
                <Image src="/images/Notes Icon2.png" alt="" height="25px" width="25px" />
              </Button>

              {/* quiz btn */}
              <div className={`position-relative`}>
                <Button>
                  <div
                    className={`${styles.videoQuiz}`}
                    onClick={() => toggleStates(setShowQuizDropdown, showQuizDropdown)}></div>
                </Button>

                {showQuizDropdown && (
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
