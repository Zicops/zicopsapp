import Image from 'next/image';
import styles from './nextButton.module.scss';

export default function NextButton({ clickHandler }) {
  return (
    <button type="button" className={styles.nextBtn} onClick={clickHandler}>
      <span>Next</span>
      <Image src="/images/bigarrowright.png" alt="" height={20} width={20} />
    </button>
  );
}
