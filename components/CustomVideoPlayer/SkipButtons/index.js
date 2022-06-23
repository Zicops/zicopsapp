import styles from '../customVideoPlayer.module.scss';

export default function SkipButtons({ nextBtnObj, stayBtnObj }) {
  const {
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
