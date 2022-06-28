import styles from '../../learnerExam.module.scss';

const InstructionLayout = ({ children }) => {
  return (
    <div className={styles.instructionLayout}>
      <button className={`${styles.layoutBtn}`}>
        <img src="/images/Back.png" />
      </button>
      <div> {children}</div>
    </div>
  );
};

export default InstructionLayout;
