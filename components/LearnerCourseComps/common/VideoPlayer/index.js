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
    isSubtitleShown: false,
    subtitleUrl: null,
    startFrom: 0,
    handleNextClick: null,
    handlePreviousClick: null,
  },
  containerRef,
}) {
  const {
    videoRef,
    canvasRef,
    videoContainerRef,
    playerState,
    updateStateProgress,
    updateVideoProgress,
    toggleIsPlaying,
    moveVideoProgressBy,
    toggleVideoFullScreen,
    toggleMute,
    handleVolume,
    isBuffering,
  } = useHandleVideo(videoData, containerRef);

  if (!videoData?.src) return <div className={`${styles.noVideoPresent}`}>No Video URL Found</div>;

  return (
    <div className={`${styles.videoPlayer}`} ref={videoContainerRef}>
      {!!isBuffering && (
        <Spinner
          customStyles={{
            zIndex: 1,
            position: 'absolute',
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
      />

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
      />
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
