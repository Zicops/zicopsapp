import styles from './mainBody.module.scss';
//MainBody
const MainBody = ({ children, customStyles = {} }) => {
  return (
    <div className={`${styles.content}`} style={customStyles}>
      {children}
    </div>
  );
};

export default MainBody;
