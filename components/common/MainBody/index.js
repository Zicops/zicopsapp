import styles from './mainBody.module.scss';
//MainBody
const MainBody = ({ children }) => {
  return <div className={`${styles.content}`}>{children} </div>;
};

export default MainBody;
