import styles from './learnerPageContainer.module.scss';

export default function LearnerPageContainer({ children }) {
  return <div className={`${styles.courseShowContainer}`}>{children}</div>;
}
