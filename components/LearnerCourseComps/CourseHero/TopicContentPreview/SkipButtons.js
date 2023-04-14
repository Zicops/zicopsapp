import styles from '../../learnerCourseComps.module.scss';

export default function SkipButtons({ nextBtnObj = {}, stayBtnObj = {} }) {
  const {
    text: nextBtnText,
    customStyles: nextStyles,
    classes: nextClasses,
    clickHandler: nextClickHandler,
  } = nextBtnObj;
  const {
    text: stayBtnText,
    customStyles: stayStyles,
    classes: stayClasses,
    clickHandler: stayClickHandler,
  } = stayBtnObj;

  return (
    <div className={`${styles.bingeClasses}`}>
      {!!stayBtnText && (
        <div className={`${stayClasses}`} style={stayStyles}>
          <div onClick={stayClickHandler}>{stayBtnText}</div>
        </div>
      )}
      {!!nextBtnText && (
        <div className={`${nextClasses}`} style={nextStyles}>
          <div onClick={nextClickHandler}>{nextBtnText}</div>
        </div>
      )}
    </div>
  );
}
