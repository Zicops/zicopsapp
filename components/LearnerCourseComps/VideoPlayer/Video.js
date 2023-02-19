// components\common\VideoPlayer\Video.js

import styles from './videoPlayer.module.scss';

export default function Video({
  videoRef,
  videoSrc,
  updateStateProgress,
  toggleIsPlaying,
  children,
}) {
  return (
    <>
      <div className={`${styles.player}`} onClick={() => toggleIsPlaying()}>
        <video
          tabIndex="0"
          ref={videoRef}
          // onClick={handleClick}
          // onKeyDown={handleKeyDown}
          onTimeUpdate={() => updateStateProgress()}
          // muted={playerState.isMuted}
          // className={`${styles.videoElement}`}
          src={videoSrc}
          // onPlay={() => updateIsPlayingTo(true)}
          // onPause={() => updateIsPlayingTo(false)}
          // src={'https://www.youtube.com/watch?v=PNtFSVU-YTI'}
          // autoPlay={true}
          // controls
        >
          {/* {isSubtitleShown && (
            <track
              kind="subtitles"
              label="English Subtitles"
              srcLang="en"
              default
              hidden
              // src={
              //   isTrackSrcAvailable
              //     ? topicContent[currentTopicContentIndex]?.subtitleUrl[currentSubtitleIndex]
              //         ?.url
              //     : ''
              // }
              src={
                isTrackSrcAvailable
                  ? `/api/overrideCors?filePath=${encodeURIComponent(
                      topicContent[currentTopicContentIndex]?.subtitleUrl[
                        currentSubtitleIndex
                      ]?.url
                    )}`
                  : ''
              }
              // src={'/pineapple.vtt'}
            />
          )} */}
          {/* <track default kind="captions" srcLang="en" src="/sub.vtt" /> */}
        </video>

        {children}
      </div>
    </>
  );
}
