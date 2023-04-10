import TopicPdfViews from '@/components/CourseComps/TopicPdfViews';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import Button from '../Button';
import styles from '../customVideoPlayer.module.scss';

export default function VideoPlayer({
  videoElement,
  handleOnTimeUpdate,
  playerState,
  handleClick,
  handleKeyDown,
  isControlBarVisible,
  isSubtitleShown,
  handleFullScreen
}) {
  const videoData = useRecoilValue(VideoAtom);
  // const wherebyRoomId = 'demo-6b19c433-a0c4-4bc8-b60a-0798c71ed825';
  const wherebyRoomId = 'demo-de73a812-30d0-4c00-9066-9b715a1019d2';

  const [subtitles, setSubtitles] = useState('');

  const { topicContent, currentTopicContentIndex, currentSubtitleIndex } = videoData;
  // useEffect(() => {
  //   if (!isSubtitleShown) return;

  //   function handleSubtitleLoad() {
  //     if (
  //       window.navigator.userAgent.indexOf('MSIE ') < 0 &&
  //       window.navigator.userAgent.indexOf('Trident/') < 0
  //     ) {
  //       // Not IE, do nothing.
  //       return;
  //     }

  //     var tracks = document.querySelectorAll('track');

  //     for (var i = 0; i < tracks.length; i++) {
  //       loadTrackWithAjax(tracks[i]);
  //     }
  //   }

  //   function loadTrackWithAjax(track) {
  //     var xhttp = new XMLHttpRequest();

  //     xhttp.onreadystatechange = function () {
  //       if (this.readyState == 4 && this.status == 200 && this.responseText) {
  //         // If VTT fetch succeeded, replace the src with a BLOB URL.
  //         var blob = new Blob([this.responseText], { type: 'text/vtt' });
  //         track.setAttribute('src', URL.createObjectURL(blob));
  //       }
  //     };
  //     xhttp.open('GET', track.src, true);
  //     xhttp.send();
  //   }

  //   window.addEventListener('load', handleSubtitleLoad);
  //   return () => window.removeEventListener('keyup', handleSubtitleLoad);
  // }, []);

  useEffect(() => {
    setSubtitles('');
  }, [videoData?.videoSrc, currentSubtitleIndex]);

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
        console.log(this);
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

  const isTrackSrcAvailable =
    topicContent[currentTopicContentIndex] &&
    topicContent[currentTopicContentIndex]?.subtitleUrl &&
    topicContent[currentTopicContentIndex]?.subtitleUrl[currentSubtitleIndex];

  return (
    <>
      {!videoData.videoSrc && videoData?.type !== 'classroom' && (
        <div className={styles.fallbackForVideo}>No Video Present</div>
      )}

      {/* <button
        style={{ opacity: 0, zIndex: -10000000, position: 'absolute', top: '0px' }}
        onClick={() => {
          let c = videoType + 1;
          if (c > 3) c = 1;
          setVideoType(c);
        }}>
        {videoType}
      </button> */}
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
            // src={'https://www.youtube.com/watch?v=PNtFSVU-YTI'}
            autoPlay={true}>
            {isSubtitleShown && (
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
                        topicContent[currentTopicContentIndex]?.subtitleUrl[currentSubtitleIndex]
                          ?.url
                      )}`
                    : ''
                }
                // src={'/pineapple.vtt'}
              />
            )}
            {/* <track default kind="captions" srcLang="en" src="/sub.vtt" /> */}
          </video>

          {isSubtitleShown && subtitles && (
            <span
              className={`${styles.subtitles} ${
                isControlBarVisible ? '' : styles.increaseDistanceFromBottom
              }`}>
              {subtitles}
            </span>
          )}
        </>
      )}
      {/* {videoData.type === 'SCORM' && videoData.videoSrc && ( */}
      {videoData.type === 'SCORM' && (
        <>
          <iframe
            src={
              videoData.videoSrc ||
              'https://storage.googleapis.com/content.zicops.com/course1/topic1/story_html5.html'
            }
            frameBorder="0"
            className={`${styles.videoElement}`}
          />

          <div className={`${styles.scromFullScreenBtn}`}>
            <Button handleClick={handleFullScreen}>
              {!document.fullscreenElement ? (
                <div className={`${styles.fsBtn}`}></div>
              ) : (
                <div className={`${styles.fseBtn}`}></div>
              )}
            </Button>
          </div>
        </>
      )}
      {/* {videoData?.type === 'classroom' && (
      <VCtoolStartPage/>
      )} */}
      {videoData.type === 'document' && (
        <>
          <TopicPdfViews url={videoData?.videoSrc} />

          <div className={`${styles.scromFullScreenBtn}`}>
            <Button handleClick={handleFullScreen}>
              {!document.fullscreenElement ? (
                <div className={`${styles.fsBtn}`}></div>
              ) : (
                <div className={`${styles.fseBtn}`}></div>
              )}
            </Button>
          </div>
        </>
      )}
    </>
  );
}
