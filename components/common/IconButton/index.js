import { func, oneOf, string } from 'prop-types';
import ToolTip from '../ToolTip';
import styles from './iconButton.module.scss';

export default function IconButton({
  text,
  styleClass,
  handleClick,
  tooltipText,
  tooltipPlacement
}) {
  return (
    <ToolTip title={tooltipText} placement={tooltipPlacement}>
      <button className={`${styles[styleClass]}`} onClick={handleClick}>
        <span>
          <img src="/images/plus.png" alt="" />
        </span>
        {text}
      </button>
    </ToolTip>
  );
}

IconButton.defaultProps = {
  styleClass: 'btnLight'
};

IconButton.propTypes = {
  styleClass: oneOf(['btnLight', 'btnBlack', 'btnGrey']),
  text: string,
  handleClick: func
};
