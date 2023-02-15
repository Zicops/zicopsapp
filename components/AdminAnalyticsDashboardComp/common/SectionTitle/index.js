import styles from './sectionTitle.module.scss';

export default function SectionTitle({ title = '', extraCompAtEnd = null }) {
  return (
    <div className={styles.sectionTitle}>
      <p>{title}</p>

      {extraCompAtEnd}
    </div>
  );
}
