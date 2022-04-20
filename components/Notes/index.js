import Image from 'next/image';
import styles from './notes.module.scss';

export default function Notes({ notes, title }) {
  return (
    <div className={`${styles.notes}`}>
      <div className={`${styles.header}`}>
        <h6>{title}</h6>
        <span className={`${styles.icon}`}>
          <Image src="/images/attachment.png" alt="delete_icon" height={10} width={10} />
        </span>
      </div>
      <div className={`${styles.text}`}>
        <textarea rows={4} value={notes}></textarea>
      </div>
    </div>
  );
}
