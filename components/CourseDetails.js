import styles from '../styles/CourseMaster.module.css'

const CourseDetails = () => {
    return (
        <div className={styles.course_master}>
          <div className={styles.row}>
            <label htmlFor="name" className={styles.col_25}>Course Name</label>
            <input type="text" autoComplete="name" id="name" placeholder="Default Name to come here" className={styles.col_75} required />
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Course Summary</label>
            <textarea className={styles.col_75} rows="4" placeholder="Provide and outline of the course in less than 1000 characters..." />
          </div>
          <div className={styles.row}>
            <label htmlFor="name1" className={styles.col_25}>Key Takeaway</label>
            <textarea className={styles.col_75} rows="2" placeholder="What are the key takeaway from this course in 60 words" />
          </div>
          
          <div className={styles.row}>
            <label htmlFor="name3" className={styles.col_25}>Course Page Display Picture</label>
            <div className={styles.col_75}>
              <div className={styles.upload_btn_wrapper}>
                <button className={styles.btn}>
                  <span className={styles.input_icon}>
                    <span>
                      <img src="/images/upload.png" alt="" />
                    </span>
                  </span>
                  Browse & upload
                </button>
                <input type="file" name="myfile" />
              </div>
              <div className={styles.preview_remove_links}>
                <a className={styles.preview}>Preview</a>
                <a className={styles.remove}>Remove</a>
              </div>
            </div>
          </div>
        
        </div>
    )
}

export default CourseDetails