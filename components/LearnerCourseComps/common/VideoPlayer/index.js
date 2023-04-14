import Spinner from '@/components/common/Spinner';
import { bool, number, shape, string } from 'prop-types';
import CenterFlash from './CenterFlash';
import ControlBar from './ControlBar';
import useHandleVideo from './Logic/useHandleVideo';
import Video from './Video';
import styles from './videoPlayer.module.scss';

// container ref is required for full screen
export default function VideoPlayer({
  videoData = {
    src: '',
    isAutoPlay: true,
    pauseVideo: null,
    isSubtitleShown: false,
    subtitleUrl: null,
    startFrom: 0,
    handleNextClick: null,
    handlePreviousClick: null,
    videoDuration: null,
  },
  containerRef,
  handleContainerClick = () => {},
  getVideoData = () => {},
  timelineOverlay = null,
  controlBarData = {
    isHidden: null,
    handleMouseEnter: () => {},
    handleMouseLeave: () => {},
  },
}) {
  const {
    videoRef,
    canvasRef,
    videoContainerRef,
    playerState,
    getProgressPercent,
    updateStateProgress,
    updateVideoProgress,
    toggleIsPlaying,
    moveVideoProgressBy,
    toggleVideoFullScreen,
    handleKeyDown,
    toggleMute,
    handleVolume,
    isBuffering,
  } = useHandleVideo(videoData, containerRef, getVideoData);

  // play next video if video is completed
  if (playerState?.progressPercent > 99 && !!videoData?.handleNextClick)
    videoData?.handleNextClick();

  if (!videoData?.src) return <div className={`${styles.noVideoPresent}`}>No Video URL Found</div>;

  // set startFrom to some value other than null to play video
  if (videoData?.startFrom === null)
    return (
      <Spinner
        customStyles={{
          zIndex: 1,
          position: 'absolute',
          pointerEvents: 'none',
          backgroundColor: playerState?.isPlaying ? 'transparent' : '',
        }}
      />
    );

  return (
    <div
      className={`${styles.videoPlayer}`}
      ref={videoContainerRef}
      onClick={() =>
        handleContainerClick({
          videoProgress: getProgressPercent().progress,
          time: videoRef?.current?.currentTime,
        })
      }>
      {!!isBuffering && (
        <Spinner
          customStyles={{
            zIndex: 1,
            position: 'absolute',
            pointerEvents: 'none',
            backgroundColor: playerState?.isPlaying ? 'transparent' : '',
          }}
        />
      )}
      <CenterFlash />

      <Video
        videoSrc={videoData?.src}
        videoRef={videoRef}
        updateStateProgress={updateStateProgress}
        toggleIsPlaying={toggleIsPlaying}
        playerState={playerState}
        subtitleUrl={videoData?.subtitleUrl}
        isSubtitleShown={videoData?.isSubtitleShown}
        handleKeyDown={handleKeyDown}
      />

      <div
        className={`${controlBarData?.isHidden ? 'slideDown' : ''}`}
        onMouseEnter={controlBarData?.handleMouseEnter}
        onMouseLeave={controlBarData?.handleMouseLeave}>
        <ControlBar
          playerState={playerState}
          videoRef={videoRef}
          canvasRef={canvasRef}
          toggleIsPlaying={toggleIsPlaying}
          moveVideoProgressBy={moveVideoProgressBy}
          updateVideoProgress={updateVideoProgress}
          toggleVideoFullScreen={toggleVideoFullScreen}
          handleNextClick={videoData?.handleNextClick}
          handlePreviousClick={videoData?.handlePreviousClick}
          handleMute={toggleMute}
          handleVolumeChange={handleVolume}
          timelineOverlay={timelineOverlay}
        />
      </div>
    </div>
  );
}

VideoPlayer.propTypes = {
  videoData: shape({
    src: string,
    isAutoPlay: bool,
    startFrom: number,
  }),
};
