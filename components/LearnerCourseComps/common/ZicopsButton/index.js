import Snipper from '@/common/Spinner';
import PropTypes from 'prop-types';
import styles from './zicopsButton.module.scss';

export default function ZicopsButton({
  display,
  handleClick,
  isDisabled,
  type,
  isError,
  isLoading,

  padding,
  color,
  backgroundColor,
  border,
  fontSize,
  fontWeight
}) {
  if (!display) return null;

  return (
    <>
      <button
        className={`${styles.zicopsButton} ${!!padding ? styles.shrink : ''} ${
          isError ? styles.error : ''
        }`}
        style={{
          padding,
          color,
          backgroundColor,
          border,
          fontSize,
          fontWeight
        }}
        onClick={handleClick}
        disabled={!!isDisabled}
        type={type}>
        {isLoading ? <Snipper /> : display}
      </button>
    </>
  );
}

ZicopsButton.defaultProps = {
  display: '',
  handleClick: () => {},
  type: 'button',

  padding: null,
  color: null,
  backgroundColor: null,
  border: null,
  fontSize: null,
  fontWeight: null,

  isDisabled: false,
  isError: false,
  isLoading: false
};

ZicopsButton.propTypes = {
  display: PropTypes.oneOfType([PropTypes.element, PropTypes.number, PropTypes.string]),
  handleClick: PropTypes.func,
  type: PropTypes.string,

  padding: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,

  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
};
