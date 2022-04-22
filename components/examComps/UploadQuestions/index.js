import UploadButton from './UploadButton';
import styles from './uploadQuestions.module.scss';

const UploadQuestions = () => {
  return (
    <>
      <div className={`${styles.uq_container}`}>
        <div className={`${styles.uq_second}`}>
          <span>Download sample template for downloading questions:</span>
          <button>Download template</button>
        </div>
        <span className={`${styles.small}`}>Upload Excel filled data with standard form</span>
        <UploadButton />
      </div>
    </>
  );
};

export default UploadQuestions;
