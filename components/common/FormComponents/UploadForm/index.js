import BrowseAndUpload from '../BrowseAndUpload';
import styles from '../formComponents.module.scss';

export default function UploadForm() {
  return (
    <div className={styles.uploadForm}>
      <div className={styles.download}>
        <button>Download Template</button>
        <p>Sample file format template</p>
      </div>

      <div className={styles.upload}>
        <label>Upload Profiles: </label>
        <span>Upload Excel filled with data as per the standard template</span>
        <BrowseAndUpload />
      </div>
    </div>
  );
}
