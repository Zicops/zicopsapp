import ToolTip from '../ToolTip';
import styles from './button.module.scss';

const Button = ({
  text,
  type,
  clickHandler,
  isDisabled,
  customStyles,
  styleClass,
  tooltipTitle
}) => {
  return (
    <ToolTip title={tooltipTitle}>
      <button
        className={`${styles.btn} ${styleClass}`}
        style={customStyles}
        type={type}
        onClick={clickHandler}
        disabled={!!isDisabled}>
        {text}
      </button>
    </ToolTip>
  );
};

export default Button;
