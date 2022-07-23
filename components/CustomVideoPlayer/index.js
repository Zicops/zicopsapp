import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { VideoAtom } from '../../state/atoms/video.atom';
import CenterFlash from './CenterFlash';
import ControlBar from './ControlBar';
import styles from './customVideoPlayer.module.scss';
import DraggableDiv from './DraggableDiv';
import useHandleNotes from './Logic/useHandleNotes';
import useVideoPlayer from './Logic/useHandleVideo';
import SkipButtons from './SkipButtons';
import UiComponents from './UiComponents';
import NoteCard from './UiComponents/Notes/NoteCard';
import VideoPlayer from './VideoPlayer';

export default function CustomVideo({ set }) {
  const videoData = useRecoilValue(VideoAtom);
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);

  const { isPreview, topicContent, currentTopicContentIndex } = videoData;
  const [showBingeButtons, setShowBingeButtons] = useState(false);
  const [showSkipIntroButtons, setShowSkipIntroButtons] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  const videoElement = useRef(null);
  const videoContainer = useRef(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    moveVideoProgress,
    toggleMute,
    updateIsPlayingTo,
    reloadVideo,
    handleVolume,
    toggleFullScreen,
    playPauseActivated,
    handleKeyDownEvents,
    hideControls,
    hideTopBar,
    handleMouseExit,
    handleMouseMove,
    seek,
    tooltip,
    playNextVideo,
    playPreviousVideo,
    setVideoTime,
    moveVideoProgressBySeconds
  } = useVideoPlayer(videoElement, videoContainer, set);
  const { userNotes, handleDragEnd, handleClose, handlePin } = useHandleNotes();

  useEffect(() => {
    set(true);

    // reset video progress when unmounted
    // return () => handleMouseMove({ target: { value: 0 } });
  }, []);

  useEffect(() => {
    setShowBingeButtons(false);
    setShowSkipIntroButtons(false);
  }, [videoData.videoSrc]);

  useEffect(() => {
    videoContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }, [videoData]);

  // turn off video player if preview video ends
  useEffect(() => {
    if (isPreview && playerState.progress === 100) set(false);

    // autoplay next video
    if (playerState.progress === 100) playNextVideo();

    // add logic for preventing binge button for last video
    if (topicContent && showBingeButtons !== null) {
      const isStartTime = topicContent[0]?.nextShowTime > 0;
      const buttonShowTime = isStartTime
        ? topicContent[currentTopicContentIndex]?.nextShowTime
        : videoElement.current?.duration - topicContent[currentTopicContentIndex]?.fromEndTime;

      if (!buttonShowTime) return;
      setShowBingeButtons(buttonShowTime < videoElement.current?.currentTime);
    }

    // skip intro logic
    if (topicContent && showSkipIntroButtons !== null) {
      const skipIntroTime = topicContent[0]?.startTime;
      const skipIntroDuration = topicContent[0]?.skipIntroDuration;

      if (!skipIntroDuration || !skipIntroTime) return;
      const currentTime = videoElement.current?.currentTime;

      if (showSkipIntroButtons === null) return;

      // show buttons if the video time is between skip start time and intro duration
      setShowSkipIntroButtons(
        skipIntroTime < currentTime && skipIntroTime + skipIntroDuration > currentTime
      );
    }
  }, [playerState.progress]);

  // binge logic
  let bingeTimeout = null;
  useEffect(() => {
    // start 5 sec timer to play next video
    if (showBingeButtons) {
      bingeTimeout = setTimeout(() => {
        setShowBingeButtons(false);
        playNextVideo();
      }, 5000);
    }

    return () => clearTimeout(bingeTimeout);
  }, [showBingeButtons]);

  // currently  not used, can remove later
  const vidRef = useRef();

  return (
    <div className={styles.videoContainer} ref={videoContainer} onDoubleClick={toggleFullScreen}>
      {/* floating notes */}
      {floatingNotes?.map((noteObj, i) => {
        if (!noteObj.isPinned && hideTopBar) {
          handleClose(noteObj, i, true);
          return null;
        }

        return (
          <DraggableDiv
            key={noteObj.id}
            initalPosition={{
              x: noteObj.x + 10,
              y: noteObj.y + 10
            }}>
            <NoteCard
              isDraggable={false}
              noteObj={noteObj}
              handleClose={() => handleClose(noteObj, i, true)}
            />
          </DraggableDiv>
        );
      })}

      {/* custom Ui components */}
      {/* <div className={`${styles.customUiContainer} ${hideTopBar ? styles.fadeHideTop : ''}`}> */}
      <UiComponents
        styleClass={hideTopBar ? styles.fadeHideTop : ''}
        updateIsPlayingTo={updateIsPlayingTo}
        set={set}
        key={'ui'}
        refs={{ videoElement, videoContainer }}
        playerState={playerState}
        isTopBarHidden={hideTopBar}
        subtitleState={[showSubtitles, setShowSubtitles]}
        moveVideoProgressBySeconds={moveVideoProgressBySeconds}
      />
      {/* </div> */}
      {playPauseActivated !== null && <CenterFlash state={playPauseActivated} />}

      <div className="video_wrapper">
        {/* video player */}
        <VideoPlayer
          videoElement={videoElement}
          handleOnTimeUpdate={handleOnTimeUpdate}
          playerState={playerState}
          handleClick={togglePlay}
          handleKeyDown={handleKeyDownEvents}
          isControlBarVisible={hideControls}
          isSubtitleShown={showSubtitles}
        />

        {/* skip intro button */}
        {showSkipIntroButtons && (
          <>
            <SkipButtons
              nextBtnObj={{
                text: 'Skip Intro',
                classes: styles.skipIntroBtn,
                // customStyles: {
                //   background: `linear-gradient(90deg, var(--primary) ${
                //     ((videoElement.current?.currentTime - topicContent[0]?.startTime) /
                //       topicContent[0].skipIntroDuration) *
                //       100 || 0
                //   }%, var(--dark_one) 0%, var(--dark_one) 100%)`
                // },
                clickHandler: () => {
                  const skipIntroTime = topicContent[0]?.startTime;
                  const skipIntroDuration = topicContent[0]?.skipIntroDuration;
                  const videoDuration = videoElement.current?.duration;

                  const skipTime = ((skipIntroTime + skipIntroDuration) / videoDuration) * 100;

                  setVideoTime(skipTime);
                  setShowSkipIntroButtons(null);
                }
              }}
              stayBtnObj={{ isVisible: false }}
            />
          </>
        )}

        {/* watch credits button */}
        {showBingeButtons && (
          <>
            <SkipButtons
              nextBtnObj={{
                text: 'Next Topic',
                classes: styles.nextPlayBtn,
                clickHandler: () => {
                  playNextVideo();
                  setShowBingeButtons(false);
                }
              }}
              stayBtnObj={{
                text: 'Watch Credits',
                classes: styles.watchCreditsBtn,
                clickHandler: () => {
                  clearTimeout(bingeTimeout);
                  setShowBingeButtons(null);
                }
              }}
            />
          </>
        )}

        {/* control bar */}
        <div
          className={`${styles.controls} ${hideControls ? styles.fadeHide : ''}`}
          ref={vidRef}
          onClick={() => videoElement.current?.focus()}>
          <ControlBar
            handleMouseExit={handleMouseExit}
            handleMouseMove={handleMouseMove}
            seek={seek}
            reloadVideo={reloadVideo}
            handlePlay={togglePlay}
            handleFullScreen={toggleFullScreen}
            forwardVideo={() => moveVideoProgress(true)}
            backwardVideo={() => moveVideoProgress(false)}
            handleProgress={handleVideoProgress}
            handleMute={toggleMute}
            handleVolume={handleVolume}
            playerState={playerState}
            tooltip={tooltip}
            playNextVideo={playNextVideo}
            playPreviousVideo={playPreviousVideo}
          />
        </div>
      </div>
    </div>
  );
}
