import Button from '../Button';
import styles from './examFooter.module.scss';

const ExamFooter = () => {
  return (
    <div className={`${styles.footer_panel}`}>
      <div className={`${styles.left_text}`}>
        <h3>Status: Draft</h3>
      </div>
      <div className={`${styles.right_text}`}>
        <Button type={'submit'} text={'Add'} />
        <Button text={'Cancel'} />
      </div>
    </div>
  );
};

export default ExamFooter;
