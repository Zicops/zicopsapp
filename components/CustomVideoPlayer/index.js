import Image from 'next/image';
import Button from '../VideoPlayer/ControlBar/Button';
import { useContext, useRef, useState } from 'react';
import { userContext } from '../../state/contexts/UserContext';
import ControlBar from '../VideoPlayer/ControlBar';
import styles from './customVideoPlayer.module.scss';
import useVideoPlayer from './Logic/useHandleVideo';
import useSaveData from './Logic/useSaveData';
import { courseContext } from '../../state/contexts/CourseContext';

export default function CustomVideo({ set }) {
  const PlayerClose = () => set(false);
  let videoSrc = '/videos/zicops-product-demo-learner-panel.mp4';

  const { fullCourse } = useContext(courseContext);
  if (fullCourse?.previewVideo) videoSrc = fullCourse.previewVideo;

  const videoElement = useRef(null);
  const videoContainer = useRef(null);

  const [BookmarkShow, setBookmarkShow] = useState(false);

  function toggleBookmark() {
    setBookmarkShow((BookmarkShow) => !BookmarkShow);
  }
  const {
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
    updateIsPlayingTo
  } = useVideoPlayer(videoElement, videoContainer);

  const userContextData = useContext(userContext);

  const {
    handleBookmarkChange,
    bookmarkData,
    handleSaveBookmark,
    notes,
    handleNotesChange,
    handleSaveNotes
  } = useSaveData(videoElement, userContextData);

  const [hideControls, setHideControls] = useState(0);

  const vidRef = useRef();

  // If no mouse movement for 3 sec, setHideControls(1)
  // var elem = vidRef?.current;
  var timeout;
  var duration = 2500;
  document.addEventListener('mousemove', function () {
    // console.log("Mouse is moving!")
    setHideControls(0);
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      // console.log("Mouse Has stopped!");
      setHideControls(1);
    }, duration);
  });

  return (
    <div className={styles.videoContainer} ref={videoContainer}>
      {/* <div className="custom-ui-container">Custom Bar</div> */}
      <div className={`${styles.customUiContainer} ${hideControls ? styles.fadeHideTop : ''}`}>
        <div className={`${styles.topIconsContainer}`}>
          <div className={`${styles.firstIcon}`} onClick={PlayerClose}>
            <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
          </div>
          <div className={`${styles.leftIcons}`}>
            <Button>
              <Image src="/images/4019936_2.png" alt="" height="30px" width="28px" />
            </Button>
            <Button>
              <Image src="/images/pot-plant-icon.png" alt="" height="30px" width="30px" />
            </Button>
            <Button>
              <Image
                src="/images/conversation-icon-png-clipart2.png"
                alt=""
                height="30px"
                width="30px"
              />
            </Button>
          </div>
          <div className={`${styles.centerText}`}></div>
          <div className={`${styles.rightIcons}`}>
            <Button>
              <Image
                src="/images/bookmark2.png"
                alt=""
                height="30px"
                width="18px"
                onMouseEnter={() => {
                  toggleBookmark();
                  updateIsPlayingTo(false);
                }}
              />
            </Button>
            <Button>
              <Image src="/images/Notes Icon2.png" alt="" height="25px" width="25px" />
            </Button>
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
        {BookmarkShow && (
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
      </div>
      <div className="video_wrapper">
        <video
          src={videoSrc}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted={playerState.isMuted}
          id="video"
        />
        {/* {!hideControls && */}
        <div className={`${styles.controls} ${hideControls ? styles.fadeHide : ''}`} ref={vidRef}>
          <ControlBar
            isPause={playerState.isPlaying}
            reloadVideo={reloadVideo}
            handlePlay={togglePlay}
            handleFullScreen={toggleFullScreen}
            forwardVideo={() => moveVideoProgress(true)}
            backwardVideo={() => moveVideoProgress(false)}
            handleProgress={handleVideoProgress}
            progress={playerState.progress}
            isMute={playerState.isMuted}
            handleMute={toggleMute}
            handleVolume={handleVolume}
          />
        </div>
        {/* } */}
      </div>
    </div>
  );
}
