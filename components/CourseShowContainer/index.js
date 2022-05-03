import styles from './courseShowContainer.module.scss';

const CourseShowContainer = ({ children }) => {
  return <div className={`${styles.courseShowContainer}`}>{children}</div>;
};

export default CourseShowContainer;
