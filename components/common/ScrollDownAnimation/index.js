import styles from './scrollDownAnimation.module.scss';

const ScrollDownAnimation = () => {
    return (
      <div className={styles.animatedDownArrow}>
        <img className={styles.imageTop} src="/images/svg/down-arrow.svg" />
        <img className={styles.imageMiddle} src="/images/svg/down-arrow.svg" />
        <img className={styles.imageBottom} src="/images/svg/down-arrow.svg" />
      </div>
    );
}
 
export default ScrollDownAnimation;