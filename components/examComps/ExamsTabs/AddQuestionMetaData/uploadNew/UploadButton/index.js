import ToolTip from '@/components/common/ToolTip';
import styles from '../../addQuestionMetaData.module.scss';

const UploadButton = () => {
  return (
    <>
      <div className={`${styles.row}  ${styles.my_30}`}>
        <label htmlFor="name3" className={`${styles.col_25}`}>
          Upload questions:
        </label>
        <div className={`${styles.col_75}`}>
          <div className={`${styles.upload_btn_wrapper}`}>
            <button className={`${styles.btn}`}>
              <span className={`${styles.input_icon}`}>
                <span>
                  <img src="/images/upload.png" alt="" />
                </span>
              </span>
              Browse & upload
            </button>
            <input
              type="file"
              name="uploadCourseVideo" /*onChange={uploadCourseVideo} -> left here because logic was needed in future use*/
            />
          </div>
          <div className={`${styles.preview_remove_links}`}>
            <ToolTip title="Click here to Preview Uploaded File" placement="bottom">
            <a className={`${styles.preview}`}>Preview</a>
            </ToolTip>
            <ToolTip title="Upload File to Preview" placement="bottom">
            <a className={`${styles.remove}`}>Remove</a>
            </ToolTip>
          </div>
        </div>
        {/* left here because needed a popup if the user upload file other than excel template
         <div className="col_50">
          <span id="coursePreview">{courseVideo.file ? courseVideo.file.name : ''}</span>
        </div> */}
      </div>
    </>
  );
};

export default UploadButton;
