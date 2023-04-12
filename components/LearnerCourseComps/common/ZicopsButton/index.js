import Spinner from '@/common/Spinner';
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
  paddingX,
  paddingY,
  color,
  backgroundColor,
  border,
  fontSize,
  fontWeight,
}) {
  if (!display) return null;

  const customStyleObj = {
    padding,
    color,
    backgroundColor,
    border,
    fontSize,
    fontWeight,
  };

  if (paddingX) customStyleObj.paddingLeft = paddingX;
  if (paddingX) customStyleObj.paddingRight = paddingX;
  if (paddingY) customStyleObj.paddingTop = paddingY;
  if (paddingY) customStyleObj.paddingBottom = paddingY;

  return (
    <>
      <button
        className={`${styles.zicopsButton} ${!!padding ? styles.shrink : ''} ${
          isError ? styles.error : ''
        } ${isLoading ? styles.loading : ''}`}
        style={customStyleObj}
        onClick={(e) => {
          if (isLoading || isDisabled) return;

          handleClick(e);
        }}
        disabled={!!isDisabled}
        type={type}>
        {isLoading ? <Spinner size="30px" /> : display}
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
  isLoading: false,
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
  isLoading: PropTypes.bool,
};
