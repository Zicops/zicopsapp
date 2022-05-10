import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { filterModule } from '../../../helper/data.helper';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { VideoAtom } from '../../../state/atoms/video.atom';
import { courseContext } from '../../../state/contexts/CourseContext';
import Button from '../Button';
import useSaveData from '../Logic/useSaveData';
import styles from '../customVideoPlayer.module.scss';

export default function UiComponents({ refs, updateIsPlayingTo, set, playerState }) {
  const { videoElement, videoContainer } = refs;
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const moduleData = useRecoilValue(ModuleAtom);
  const { fullCourse } = useContext(courseContext);

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

  const { showBookmark, setShowBookmark, showLanguageSubtitles, setShowLanguageSubtitles } = states;
  const PlayerClose = () => set(false);

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

  return (
    <>
      <div className={`${styles.topIconsContainer}`}>
        {/* back button on left which close the player and return to hero */}
        <div className={`${styles.firstIcon}`} onClick={PlayerClose}>
          <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
        </div>

        <div className={`${styles.leftIcons}`}>
          {/* subtitles and language button */}
          <Button styleClass={'position-relative'}>
            <Image
              src="/images/4019936_2.png"
              alt=""
              height="30px"
              width="28px"
              onClick={() => {
                toggleStates(setShowLanguageSubtitles, showLanguageSubtitles);
              }}
            />

            {/* subtitle and language element */}
            {showLanguageSubtitles && (
              <div className={`${styles.languageList}`}>
                {/* for topic content language  */}
                {videoData?.topicContent &&
                  videoData.topicContent.map((c, i) => (
                    <button
                      className={`${
                        i === videoData.currentTopicContentIndex ? styles.languageBtnActive : ''
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
              </div>
            )}
          </Button>

          {/* something I dont know, update comment later */}
          <Button>
            <Image src="/images/pot-plant-icon.png" alt="" height="30px" width="30px" />
          </Button>

          {/* something to do with chat, update later*/}
          <Button>
            <Image
              src="/images/conversation-icon-png-clipart2.png"
              alt=""
              height="30px"
              width="30px"
            />
          </Button>
        </div>

        {/* video title */}
        <div className={`${styles.centerText}`}>
          <div className={`${styles.centerTextHeading}`}>{truncateToN(fullCourse?.name, 60)}</div>
          <div className={`${styles.centerTextSubheading}`}>{truncateToN(courseTopicName, 80)}</div>
        </div>

        <div className={`${styles.rightIcons}`}>
          {/* bookmark btn */}
          <Button>
            <Image
              src="/images/bookmark2.png"
              alt=""
              height="30px"
              width="18px"
              onMouseEnter={() => {
                toggleStates(setShowBookmark, showBookmark);
                updateIsPlayingTo(false);
              }}
            />
          </Button>

          {/* notes btn */}
          <Button>
            <Image src="/images/Notes Icon2.png" alt="" height="25px" width="25px" />
          </Button>

          {/* quiz btn */}
          <Button>
            <Image src="/images/Quiz Icon2.png" alt="" height="30px" width="30px" />
          </Button>
        </div>

        <div className={`${styles.lastIcon}`}></div>
      </div>
      {/* <div className={`${styles.bookmarkBtn}`}>
          <button onClick={() => updateIsPlayingToPlay(false)}>Bookmark</button>
        </div> */}
      {/* <div className={`${styles.drawer}`}> */}

      {/* elements which will be activated when user clicks on one of the above btns  */}
      {/* show bookmark input to save bookmarks */}
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
      <div id="output"></div>
    </>
  );
}
