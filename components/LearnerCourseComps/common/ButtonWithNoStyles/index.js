import styles from './buttonWithNoStyles.module.scss';

export default function ButtonWithNoStyles({
  text = '',
  styleClass = '',
  customInlineStyles = {},
  isDisabled = false,
  btnProps = {},
  handleClick = () => {},
}) {
  return (
    <>
      <button
        className={`${styles.buttonWithNoStyles} ${styleClass}`}
        style={customInlineStyles}
        disabled={isDisabled}
        onClick={handleClick}
        {...btnProps}>
        {text}
      </button>
    </>
  );
}
