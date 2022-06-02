import styles from './congratulationsFooter.module.scss';
const CongratulationsFooter = ({ children }) => {
  return <div className={`${styles.congratulations_Footer}`}>{children}</div>;
};

export default CongratulationsFooter;
