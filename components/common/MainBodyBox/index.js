import styles from './mainBodyBox.module.scss';

const MainBodyBox = ({ children, customStyle, customClass }) => {
  return (
    <div className={`${styles.content_panel} ${customClass}`} style={customStyle}>
      {children}
    </div>
  );
};

export default MainBodyBox;
