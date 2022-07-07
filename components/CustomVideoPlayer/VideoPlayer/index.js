import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import styles from '../customVideoPlayer.module.scss';

export default function VideoPlayer({
  videoElement,
  handleOnTimeUpdate,
  playerState,
  handleClick,
  handleKeyDown,
  isControlBarVisible,
  isSubtitleShown
}) {
  const videoData = useRecoilValue(VideoAtom);

  const [subtitles, setSubtitles] = useState('');

  useEffect(() => {
    if (!videoElement?.current) return;
    if (!isSubtitleShown) return;

    const track = videoElement?.current?.textTracks[0];
    const cues = track.cues;

    track.mode = 'hidden'; // must occur before cues is retrieved

    if (!cues || !cues?.length) return;

    for (let i = 0; i < cues.length; i++) {
      const cue = cues[i];

      cue.onenter = function () {
        setSubtitles(this.text);
      };

      cue.onexit = () => setSubtitles('');
    }
    //   console.log(videoElement.current?.textTracks[0]?.cues);
    //   if (
    //     videoElement.current?.textTracks[0]?.cues &&
    //     videoElement.current?.textTracks[0]?.cues?.length
    //   ) {
    //     videoElement.current?.textTracks[0].cues?.forEach((cue) => (cue.line = -4));
    //   }
    // if (
    //   videoElement.current?.textTracks[0]?.activeCues &&
    //   videoElement.current?.textTracks[0]?.activeCues.length
    // ) {
    //   videoElement.current.textTracks[0].activeCues[0].line = -4;
    // }
  }, [videoElement.current?.textTracks[0]?.cues?.length]);

  const { topicContent, currentTopicContentIndex, currentSubtitleIndex } = videoData;
  const isTrackSrcAvailable =
    topicContent[currentTopicContentIndex] &&
    topicContent[currentTopicContentIndex]?.subtitleUrl &&
    topicContent[currentTopicContentIndex]?.subtitleUrl[currentSubtitleIndex];

  return (
    <>
      {!videoData.videoSrc && <div className={styles.fallbackForVideo}>No Video Present</div>}

      {videoData.type === 'mp4' && videoData.videoSrc && (
        <>
          <video
            tabIndex="0"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={videoElement}
            onTimeUpdate={handleOnTimeUpdate}
            muted={playerState.isMuted}
            className={`${styles.videoElement}`}
            src={videoData.videoSrc}
            autoPlay={true}>
            {isSubtitleShown && (
              <track
                kind="subtitles"
                label="English Subtitles"
                srcLang="en"
                default
                hidden
                src={
                  isTrackSrcAvailable
                    ? topicContent[currentTopicContentIndex]?.subtitleUrl[currentSubtitleIndex]?.url
                    : ''
                }
                // src={'/pineapple.vtt'}
              />
            )}
            {/* <track default kind="captions" srcLang="en" src="/sub.vtt" /> */}
          </video>
          <span
            className={`${styles.subtitles} ${
              isControlBarVisible ? '' : styles.increaseDistanceFromBottom
            }`}>
            {subtitles}
          </span>
        </>
      )}

      {videoData.type === 'SCORM' && videoData.videoSrc && (
        <iframe
          src="https://storage.googleapis.com/content.zicops.com/course1/topic1/story_html5.html"
          frameBorder="0"
          className={`${styles.videoElement}`}
        />
      )}
    </>
  );
}
