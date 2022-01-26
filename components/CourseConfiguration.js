import BulletPointInput from './small/BulletPointInput'
import styles from '../styles/CourseMaster.module.css'

const CourseConfiguration = () => {
    return (
        <div className={styles.course_master}>
          <div className={styles.row}>
            <label htmlFor="name" className={styles.col_25}>Publish Date</label>
            <div className={styles.col_25}>
              <BulletPointInput placeholder="Add Good For and press enter" />
            </div>
            <label htmlFor="name" className={styles.col_25} style={{ textAlign: 'center' }}><span>Expire Date</span></label>
            <div className={styles.col_25}>
              <BulletPointInput placeholder="Add Must For and press enter" />
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="name" className={styles.col_25}>Quality Control Check</label>
            <div className={styles.col_25}>
              <div className={styles.active_button}>
                <label htmlFor="display_button" className={styles.td_label}></label>
                <label className={styles.switch}>
                  <input className={styles.switch_input} type="checkbox" />
                  <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                  <span className={styles.switch_handle}></span>
                </label>
              </div>
            </div>
            <div className={styles.col_25}></div>
            <div className={styles.col_25}></div>
          </div>
          <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Add Approval</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Approval"/>
                </div>
            </div>
          <div className={styles.row}>
            <label htmlFor="name" className={styles.col_25}>Visibility in the Learning space</label>
            <div className={styles.col_25}>
              <div className={styles.active_button}>
                <label htmlFor="display_button" className={styles.td_label}></label>
                <label className={styles.switch}>
                  <input className={styles.switch_input} type="checkbox" />
                  <span className={styles.switch_label} data-on="On" data-off="Off"></span>
                  <span className={styles.switch_handle}></span>
                </label>
              </div>
            </div>
            <div className={styles.col_25}></div>
            <div className={styles.col_25}></div>
          </div>
        </div>
    )
}

export default CourseConfiguration