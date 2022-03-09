import { useState, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext';
import TagInput from '../small/TagInput';
import BulletPointInput from '../small/BulletPointInput';
import styles from '../../styles/CourseMaster.module.css';


const CourseAbout = () => {
    const { fullCourse, setTab, updateCourseMaster } = useContext(courseContext);

    const inputHandler = (e) => {    
        updateCourseMaster({
            ...fullCourse,
            [e.target.name]: e.target.value,
        })
    }

    console.log(fullCourse)
    return (
        <div className={styles.course_master}>
            {/* <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}> Course Tags</label>
                <div className={styles.col_75}>
                    <TagInput placeholder="Add Course Tags"/>
                </div>
            </div> */}
            <div className={styles.row}>
                <label htmlFor="benefits" className={styles.col_25}>Learning Objectives/Outcomes</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Learning Objectives/Outcomes and press enter"
                    name="benefits"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}
                    />
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="name" className={styles.col_25}>Program Highlights/Benefits</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Program Highlights/Benefits and press enter"
                    name="benefits"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="description" className={styles.col_25}>Course Description</label>
                <textarea className={styles.col_75} rows="4" name="description" placeholder="Provide a description for the course" 
                onChange={inputHandler}
                value={fullCourse.description}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="prequisites" className={styles.col_25}>Pre-requisites</label>
                <div className={styles.col_75}>
                    <BulletPointInput placeholder="Add Pre-requisites and press enter"
                    name="prequisites"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div> 
            <div className={styles.row}>
                <label htmlFor="goodFor" className={styles.col_25}>Good For</label>
                <div className={styles.col_25}>
                    <BulletPointInput placeholder="Add Good For and press enter"
                    name="goodFor"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
                <label htmlFor="mustFor" className={styles.col_25} style={{textAlign:'center'}}><span>Must For</span></label>
                <div className={styles.col_25}>
                    <BulletPointInput placeholder="Add Must For and press enter"
                    name="mustFor"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div>
            <div className={styles.row}>
                <label htmlFor="related_skills" className={styles.col_25}>Related Skills</label>
                <div className={styles.col_75}>
                    <TagInput placeholder="Add Related Skills"
                    name="related_skills"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div>

        </div>
    )
}

export default CourseAbout