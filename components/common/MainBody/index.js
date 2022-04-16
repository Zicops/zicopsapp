import styles from './mainBody.module.scss';

const MainBody = ({ children }) => {
  return <div className={`${styles.content}`}>{children} </div>;
};

export default MainBody;
