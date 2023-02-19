import ControlBar from './ControlBar';
import useHandleVideo from './Logic/useHandleVideo';
import Timeline from './Timeline';
import Video from './Video';
import styles from './videoPlayer.module.scss';

export default function VideoPlayer({ videoData, containerRef }) {
  const {
    videoRef,
    videoContainerRef,
    playerState,
    updateStateProgress,
    updateVideoProgress,
    toggleIsPlaying,
    moveVideoProgressBy,
    toggleVideoFullScreen,
  } = useHandleVideo(videoData, containerRef);

  return (
    <div className={`${styles.videoPlayer}`} ref={videoContainerRef}>
      <Video
        videoSrc={videoData?.src}
        videoRef={videoRef}
        updateStateProgress={updateStateProgress}
        toggleIsPlaying={toggleIsPlaying}
      />

      <div className={`${styles.controlBar}`}>
        <Timeline progressPercent={playerState?.progressPercent} />

        <ControlBar
          isPlaying={playerState?.isPlaying}
          isFullScreen={playerState?.isFullScreen}
          toggleIsPlaying={toggleIsPlaying}
          moveVideoProgressBy={moveVideoProgressBy}
          updateVideoProgress={updateVideoProgress}
          toggleVideoFullScreen={toggleVideoFullScreen}
        />
      </div>
    </div>
  );
}
