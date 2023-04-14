// components\common\VideoPlayer\Video.js

import { useEffect, useState } from 'react';
import styles from './videoPlayer.module.scss';

export default function Video({
  videoRef = null,
  videoSrc = '',
  updateStateProgress = () => {},
  toggleIsPlaying = () => {},
  handleKeyDown = () => {},
  playerState = {},
  isSubtitleShown = false,
  subtitleUrl = null,
}) {
  const [subtitles, setSubtitles] = useState('');

  useEffect(() => {
    if (!videoRef?.current) return;
    if (!isSubtitleShown) return;

    const track = videoRef?.current?.textTracks[0];
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
  }, [videoRef.current?.textTracks?.[0]?.cues?.length]);

  if (!(isSubtitleShown || subtitleUrl) && subtitles?.length) setSubtitles('');

  return (
    <>
      <div className={`${styles.player}`} onClick={() => toggleIsPlaying()}>
        <video
          tabIndex="0"
          ref={videoRef}
          onTimeUpdate={() => updateStateProgress()}
          muted={playerState?.isMute}
          onKeyDown={handleKeyDown}
          src={videoSrc}>
          {!!(isSubtitleShown && subtitleUrl?.url) && (
            <track
              kind="subtitles"
              label={subtitleUrl?.language}
              default
              hidden
              src={`/api/overrideCors?filePath=${encodeURIComponent(subtitleUrl?.url)}`}
            />
          )}
        </video>

        {!!subtitles && <span className={`${styles.subtitles}`}>{subtitles}</span>}
      </div>
    </>
  );
}
