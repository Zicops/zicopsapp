import PropTypes from 'prop-types';
import styles from './learnerHeroSection.module.scss';

export default function LearnerHeroSection({
  height,
  backgroundColor,
  isLoading,
  isError,
  children,
}) {
  if (isError) return 'Error!';
  if (isLoading) return 'Loading...';

  return (
    <div
      className={`${styles.learnerHeroSection}`}
      style={{ height: `${height}vh`, backgroundColor }}
    >
      {children}
    </div>
  );
}

LearnerHeroSection.defaultProps = {
  height: 85,
  backgroundColor: styles.black,
  isLoading: false,
  isError: false,
};

LearnerHeroSection.propTypes = {
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  children: PropTypes.element,
};
