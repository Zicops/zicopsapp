import Image from 'next/image';
import styles from '../../courseBody.module.scss';

export default function CustomButtonGroup({ next, previous, goToSlide, ...rest }) {
  const {
    carouselState: { currentSlide }
  } = rest;

  return (
    <div className={`${styles.carouselButtonGroup}`}>
      <div
        className={`${styles.btn} ${styles.left} ${currentSlide === 0 ? 'disable' : ''}`}
        onClick={() => previous()}>
        <Image src="/images/bigarrowleft.png" layout="fill" />
      </div>

      <div className={`${styles.btn} ${styles.right} `} onClick={() => next()}>
        <Image src="/images/bigarrowright.png" layout="fill" />
      </div>
    </div>
  );
}
