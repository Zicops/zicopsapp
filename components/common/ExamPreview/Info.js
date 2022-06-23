import styles from './examPreview.module.scss';

export default function Info({ title, value, customStyles = null }) {
  return (
    <p className={styles.info}>
      <strong>{title}</strong> <span style={customStyles ? customStyles : {}}>{value}</span>
    </p>
  );
}
