import { func, oneOf, string } from 'prop-types';
import styles from './iconButton.module.scss';

export default function IconButton({ text, styleClass, handleClick }) {
  return (
    <button className={`${styles[styleClass]}`} onClick={handleClick}>
      <span>
        <img src="/images/plus.png" alt="" />
      </span>
      {text}
    </button>
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
