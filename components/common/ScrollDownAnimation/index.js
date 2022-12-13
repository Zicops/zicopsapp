import styles from './scrollDownAnimation.module.scss';

const ScrollDownAnimation = ({ scrollFn }) => {
  return (
    <div className={styles.animatedDownArrow} id="animatedDownArrow" onClick={scrollFn}>
      <img className={styles.imageTop} src="/images/svg/down-arrow.svg" />
      <img className={styles.imageMiddle} src="/images/svg/down-arrow.svg" />
      <img className={styles.imageBottom} src="/images/svg/down-arrow.svg" />
    </div>
  );
};
 
export default ScrollDownAnimation;