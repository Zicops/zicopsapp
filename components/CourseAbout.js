import TagInput from './small/TagInput'
import BulletPointInput from './small/BulletPointInput'
import styles from '../styles/CourseMaster.module.css'

const CourseAbout = () => {

    return (
        <div className={styles.course_master}>
            {/* <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}> Course Tags</label>
                <div className={styles.col_75}>
                    <TagInput placeholder="Add Course Tags"/>
                </div>
            </div> */}
            <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Learning Objectives/Outcomes</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Learning Objectives/Outcomes and press enter"/>
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Program Highlights/Benefits</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Program Highlights/Benefits and press enter"/>
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="name1" className={styles.col_25}>Course Description</label>
                <textarea className={styles.col_75} rows="4" placeholder="Provide a description for the course" />
            </div>
            <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Pre-requisites</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Pre-requisites and press enter"/>
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Good For</label>
                <div className={styles.col_25}>
                    <BulletPointInput placeholder="Add Good For and press enter"/>
                </div>
                <label htmlFor="name" className={styles.col_25} style={{textAlign:'center'}}><span>Must For</span></label>
                <div className={styles.col_25}>
                    <BulletPointInput placeholder="Add Must For and press enter"/>
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Related Skills</label>
                <div className={styles.col_75}>
                    <TagInput placeholder="Add Related Skills"/>
                </div>
            </div>

        </div>
    )
}

export default CourseAbout