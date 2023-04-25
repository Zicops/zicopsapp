import styles from '../../learnerCourseComps.module.scss';

export default function ChapterBlock({ name, description }) {
  return (
    <span className={styles.chapterBlock}>
      <p className={styles.name}>{name || ''}</p>
      <p className={styles.description}>{description || ''}</p>
    </span>
  );
}
