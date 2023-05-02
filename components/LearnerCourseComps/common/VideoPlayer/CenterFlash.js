import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { VideoStateChangeAtom, videoStateChangeList } from './Logic/videoPlayer.helper';
import styles from './videoPlayer.module.scss';

export default function CenterFlash() {
  const videoStateChange = useRecoilValue(VideoStateChangeAtom);
  if (!videoStateChange) return null;

  let imgSrc = '/images/svg/play-line.svg';
  if (videoStateChange === videoStateChangeList.pause) imgSrc = '/images/svg/pause-line.svg';
  if (videoStateChange === videoStateChangeList.backward) imgSrc = '/images/svg/rewind-line.svg';
  if (videoStateChange === videoStateChangeList.forward) imgSrc = '/images/svg/speed-line.svg';
  if (videoStateChange === videoStateChangeList.volumeUp) imgSrc = '/images/svg/volume-up-line.svg';
  if (videoStateChange === videoStateChangeList.volumeDown)
    imgSrc = '/images/svg/volume-down-line.svg';
  if (videoStateChange === videoStateChangeList.enterFullScreen)
    imgSrc = '/images/svg/fullscreen-line.svg';
  if (videoStateChange === videoStateChangeList.exitFullScreen)
    imgSrc = '/images/svg/fullscreen-exit-line.svg';

  if (videoStateChange === videoStateChangeList.reload) imgSrc = '/images/svg/history-fill.svg';
  if (videoStateChange === videoStateChangeList.unmute) imgSrc = '/images/svg/volume-up-line.svg';
  if (videoStateChange === videoStateChangeList.mute) imgSrc = '/images/svg/volume-mute-line.svg';

  if (videoStateChange === videoStateChangeList.next) imgSrc = '/images/svg/skip-forward-line.svg';
  if (videoStateChange === videoStateChangeList.previous) imgSrc = '/images/svg/skip-back-line.svg';

  return (
    <div className={`${styles.centerFlashIcon}`}>
      <Image
        src={imgSrc}
        alt=""
        height="100px"
        width="100px"
        className={`${styles.centerFlashIconImg}`}
      />
    </div>
  );
}
