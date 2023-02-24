import styles from './buttonWithNoStyles.module.scss';

export default function ButtonWithNoStyles({
  text = null,
  styleClass = '',
  customInlineStyles = {},
  isDisabled = false,
  btnProps = {},
  handleClick = () => {},
  children = null,
}) {
  return (
    <>
      <button
        className={`${styles.buttonWithNoStyles} ${styleClass}`}
        style={customInlineStyles}
        disabled={isDisabled}
        onClick={handleClick}
        {...btnProps}>
        {text || children}
      </button>
    </>
  );
}
