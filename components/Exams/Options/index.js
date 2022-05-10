import styles from './options.module.scss';

export default function Options({ question, btnOptions }) {
  return (
    <div className={`h-100 ${styles.options}`}>
      <div>{question}</div>

      <div className={`${styles.btnContainer}`}>
        {btnOptions.map((o) => (
          <button
            className={`${styles.btn} ${o.isActive ? styles.active : ''}`}
            onClick={o.handleClick}>
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
}
