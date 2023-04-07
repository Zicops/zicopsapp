import styles from './iconButton.module.scss';

export default function IconButton({
  handleClick = () => {},
  styleClass = '',
  iconImg = '',
  isActive = false,
  isDisabled = false
}) {
  return (
    <>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`${styles.iconBtn} ${isActive ? styles.active : ''} ${styleClass} ${
          isDisabled ? 'disabled' : ''
        }`}>
        <img src={iconImg} />
      </button>
    </>
  );
}
