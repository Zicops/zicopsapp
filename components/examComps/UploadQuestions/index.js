import UploadButton from './UploadButton';
import styles from './uploadQuestions.module.scss';

const UploadQuestions = () => {
  return (
    <>
      <div className={`${styles.uq_container}`}>
        <div className={`${styles.uq_second}`}>
          <label>Download sample template for downloading questions:</label>
          <button>Download template</button>
        </div>
        <span className={`${styles.small}`}>
          Upload Excel filled with data as per the standard format
        </span>
        <UploadButton />
      </div>
    </>
  );
};

export default UploadQuestions;
