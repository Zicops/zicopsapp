import styles from './mainBodyBox.module.scss';
import RadioButton from '../RadionButton';
import ExamFooter from '../ExamFooter';

const MainBodyBox = ({ children }) => {
  return (
    <div className={`${styles.content_panel}`}>
      <div className={`${styles.radioBtn}`}>
        <RadioButton text={'Create Question'} />
        <RadioButton text={'Upload Question'} />
      </div>
      {children}
    </div>
  );
};

export default MainBodyBox;
