import styles from './spinner.module.scss';

export default function Spinner({
  size = '50px',
  isFullScreen = false,
  customStyles = {},
  styleClass = ''
}) {
  return (
    <>
      <div
        className={`${styles.loaderContainer} ${
          isFullScreen ? styles.fullScreen : ''
        } ${styleClass}`}
        style={{ minHeight: `calc(${size} + 5px)`, ...customStyles }}>
        <div className={styles.spinner} style={{ height: size, width: size }}></div>
      </div>
    </>
  );
}
