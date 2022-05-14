import styles from '../tabContainer.module.scss';

export default function TabFooterButton({ clickHandler, text, customClass }) {
  return (
    <button onClick={clickHandler} className={`${styles.footerBtn} ${customClass}`}>
      {text}
    </button>
  );
}
