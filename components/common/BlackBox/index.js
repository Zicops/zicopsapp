import styles from './blackBox.module.scss';

export default function BlackBox({ children }) {
  return (
    <>
      <div className={`w-100 ${styles.blackBox}`}>{children}</div>
    </>
  );
}
