import { VideoAtom } from '@/state/atoms/video.atom';
import { useRecoilValue } from 'recoil';
import styles from '../customVideoPlayer.module.scss';

export default function SkipButtons({ nextBtnObj, stayBtnObj }) {
  const videoData = useRecoilValue(VideoAtom);

  const { allModuleTopic, allModuleOptions, currentModuleIndex, currentTopicIndex } = videoData;
  // if (currentModuleIndex + 1 === allModuleOptions.length) return;
  // if (videoData.allModuleTopic.length === videoData.currentTopicIndex + 1) {
  let {
    text: nextBtnText,
    customStyles: nextStyles,
    classes: nextClasses,
    clickHandler: nextClickHandler,
    isVisible: nextIsVisible = true
  } = nextBtnObj;
  const {
    text: stayBtnText,
    customStyles: stayStyles,
    classes: stayClasses,
    clickHandler: stayClickHandler,
    isVisible: stayIsVisible = true
  } = stayBtnObj;

  if (
    currentTopicIndex + 1 === allModuleTopic.length &&
    currentModuleIndex + 1 === allModuleOptions.length
  ) {
    nextIsVisible = false;
  }

  return (
    <div className={`${styles.bingeClasses}`}>
      {stayIsVisible && (
        <div className={`${stayClasses}`} style={stayStyles}>
          <div onClick={stayClickHandler}>{stayBtnText}</div>
        </div>
      )}
      {nextIsVisible && (
        <div className={`${nextClasses}`} style={nextStyles}>
          <div onClick={nextClickHandler}>{nextBtnText}</div>
        </div>
      )}
    </div>
  );
}
