import { downloadFileFromURI } from '@/helper/utils.helper';
import BrowseAndUpload from '../BrowseAndUpload';
import styles from '../formComponents.module.scss';

export default function UploadForm({
  customStyles,
  leftGapClass,
  filePath,
  fileName = 'Questions Upload Template',
  handleFileUpload = () => {}
}) {
  return (
    <div className={styles.uploadForm} style={customStyles}>
      <div className={styles.download}>
        <div className={leftGapClass}></div>
        <button
          onClick={() => {
            if (!filePath) return;

            downloadFileFromURI(filePath, fileName);
          }}>
          Download Template
        </button>
        <p>Sample file format template</p>
      </div>

      <div className={styles.upload}>
        <label>Upload Profiles: </label>
        <span>Upload Excel filled with data as per the standard template</span>
        <BrowseAndUpload handleFileUpload={handleFileUpload} />
      </div>
    </div>
  );
}
