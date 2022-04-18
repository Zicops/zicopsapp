import styles from './mainBodyBox.module.scss';

const MainBodyBox = ({ children }) => {
  return <div className={`${styles.content_panel}`}>{children}</div>;
};

export default MainBodyBox;
