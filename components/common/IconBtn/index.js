import styles from './iconBtn.module.scss';

export default function IconBtn({ handleClick=()=>{}, children, color = null, isDisabled = false }) {
  return (
    <button
      disabled={isDisabled}
      className={`${styles.iconBtn}`}
      style={color ? { color: color, border: `2px solid ${color}` } : {}}
      onClick={handleClick}>
      {children}
    </button>
  );
}
