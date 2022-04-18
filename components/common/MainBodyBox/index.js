import styles from './mainBodyBox.module.scss';
import RadioButton from '../RadionButton';
import ExamFooter from '../ExamFooter';

const MainBodyBox = ({ children }) => {
  return <div className={`${styles.content_panel}`}>{children}</div>;
};

export default MainBodyBox;
