// import UploadButton from './UploadButton';
import ToolTip from '@/components/common/ToolTip';
import styles from '../../addQuestionMetaData.module.scss';
import UploadButton from '../UploadButton';

const UploadQuestions = () => {
  return (
    <>
      <div className={`${styles.uq_container}`}>
        <div className={`${styles.uq_second}`}>
          <label>Download sample template for downloading questions:</label>
          <button><ToolTip title="Click here to Download Template" placement="left"><div>Download template</div></ToolTip></button>
        </div>
        <span className={`${styles.small}`}>
          Upload Excel filled with data as per the standard format
        </span>
        {/* <UploadButton /> */}
        <UploadButton />
      </div>
    </>
  );
};

export default UploadQuestions;
