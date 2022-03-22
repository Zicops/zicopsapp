import { useState, useEffect, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext';
import TagInput from '../small/TagInput';
import BulletPointInput from '../small/BulletPointInput';


const CourseAbout = () => {
    const { fullCourse, updateCourseMaster } = useContext(courseContext);

    const inputHandler = (e) => {    
        updateCourseMaster({
            ...fullCourse,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(()=>{
        console.log(fullCourse)
    },[])
    
    return (
        <div className="course_master">
            <div className="row">
                <label htmlFor="benefits" className="col_25">Learning Objectives/Outcomes</label>
                <div className="col_75">
                    <BulletPointInput placeholder="Add Learning Objectives/Outcomes and press enter"
                    name="outcomes"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}
                    />
                </div>
            </div>
            <div className="row">
                <label htmlFor="name" className="col_25">Program Highlights/Benefits</label>
                <div className="col_75">
                    <BulletPointInput placeholder="Add Program Highlights/Benefits and press enter"
                    name="benefits"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div>
            <div className="row">
                <label htmlFor="description" className="col_25">Course Description</label>
                <textarea className="col_75" rows="4" name="description" placeholder="Provide a description for the course" 
                onChange={inputHandler}
                value={fullCourse.description}/>
            </div>
            <div className="row">
                <label htmlFor="prequisites" className="col_25">Pre-requisites</label>
                <div className="col_75">
                    <BulletPointInput placeholder="Add Pre-requisites and press enter"
                    name="prequisites"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div> 
            <div className="row">
                <label htmlFor="goodFor" className="col_25">Good For</label>
                <div className="col_25">
                    <BulletPointInput placeholder="Add Good For and press enter"
                    name="goodFor"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
                <label htmlFor="mustFor" className="col_25" style={{textAlign:'center'}}><span>Must For</span></label>
                <div className="col_25">
                    <BulletPointInput placeholder="Add Must For and press enter"
                    name="mustFor"
                    course={fullCourse}
                    updateCourse={updateCourseMaster}/>
                </div>
            </div>
            <div className="row">
                <label htmlFor="related_skills" className="col_25">Related Skills</label>
                <div className="col_75">
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