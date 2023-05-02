import styles from './lineTextWithDescription.module.scss';

export default function LineTextWithDescription({ title, description }) {
  return (
    <span className={styles.lineText}>
      <p className={styles.title}>{title || ''}</p>
      <p className={styles.description}>{description || ''}</p>
    </span>
  );
}
