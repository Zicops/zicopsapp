import styles from './uploadButton.module.scss';

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
            <input type="file" name="uploadCourseVideo" /*onChange={uploadCourseVideo}*/ />
          </div>
          <div className={`${styles.preview_remove_links}`}>
            <a className={`${styles.preview}`}>Preview</a>
            <a className={`${styles.remove}`}>Remove</a>
          </div>
        </div>
        {/* <div className="col_50">
          <span id="coursePreview">{courseVideo.file ? courseVideo.file.name : ''}</span>
        </div> */}
      </div>
    </>
  );
};

export default UploadButton;
