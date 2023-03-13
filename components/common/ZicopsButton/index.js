import PropTypes from 'prop-types';
import Loader from '../Loader';
import styles from './zicopsButton.module.scss';

export default function ZicopsButton({
  display,
  handleClick,
  isDisabled,
  type,
  isActive,
  isError,
  isLoading,

  width,
  padding,
  color,
  backgroundColor,
  border,
  borderRadius,
  fontSize,
  fontWeight,
  float
}) {
  if (!display) return null;

  return (
    <>
      <button
        className={`${styles.zicopsButton} ${!!padding ? styles.shrink : ''} ${
          isError ? styles.error : ''
        } ${isActive ? styles.active : ''}`}
        style={{
          width,
          padding,
          color,
          backgroundColor,
          border,
          fontSize,
          fontWeight,
          borderRadius,
          float
        }}
        onClick={handleClick}
        disabled={!!isDisabled}
        type={type}>
        {isLoading ? <Loader /> : display}
      </button>
    </>
  );
}

ZicopsButton.defaultProps = {
  display: '',
  handleClick: () => {},
  type: 'button',

  width: null,
  padding: null,
  color: null,
  backgroundColor: null,
  border: null,
  borderRadius: null,
  fontSize: null,
  fontWeight: null,
  float: null,

  isDisabled: false,
  isError: false,
  isActive: false,
  isLoading: false
};

ZicopsButton.propTypes = {
  display: PropTypes.oneOfType([PropTypes.element, PropTypes.number, PropTypes.string]),
  handleClick: PropTypes.func,
  type: PropTypes.string,

  width: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  float: PropTypes.string,

  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool
};
