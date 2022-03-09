import { useEffect, useContext } from "react";
import { courseContext } from './contexts/CourseContext'

export const inputHandler = (e) => {
    
    useEffect(function(){
        console.log('loggon');
    }, []);

    updateCourseMaster({
        ...fullCourse,
        [e.target.name]: e.target.value,
    })
}

