import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import styles from './learnerHeroSection.module.scss';
import { useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom } from '../../atoms/learnerCourseComps.atom';

export default function LearnerHeroSection({
  height,
  backgroundColor,
  isLoading,
  isError,
  children,
}) {
  const containerRef = useRef(null);
  const { topicId } = useRecoilValue(ActiveCourseDataAtom);

  useEffect(() => {
    if (!containerRef?.current) return;

    containerRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [containerRef?.current, topicId]);

  if (isError) return 'Error!';
  if (isLoading) return 'Loading...';
  return (
    <div
      className={`${styles.learnerHeroSection}`}
      style={{ height: `${height}vh`, backgroundColor }}
      ref={containerRef}>
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
