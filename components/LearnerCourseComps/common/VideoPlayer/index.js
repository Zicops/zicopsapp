import Spinner from '@/components/common/Spinner';
import { bool, func, instanceOf, number, oneOfType, shape, string } from 'prop-types';
import { Component } from 'react';
import CenterFlash from './CenterFlash';
import ControlBar from './ControlBar';
import useHandleVideo from './Logic/useHandleVideo';
import Video from './Video';
import styles from './videoPlayer.module.scss';

// container ref is required for full screen
export default function VideoPlayer({
  videoData = {
    src: '',
    isAutoPlay: false,
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
      {!!isBuffering && <Spinner />}
      <CenterFlash />

      <Video
        videoSrc={videoData?.src}
        videoRef={videoRef}
        updateStateProgress={updateStateProgress}
        toggleIsPlaying={toggleIsPlaying}
        playerState={playerState}
      />

      <ControlBar
        playerState={playerState}
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
  containerRef: oneOfType([func, shape({ current: instanceOf(Component) })]),
};
