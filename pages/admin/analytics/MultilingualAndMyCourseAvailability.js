import React from 'react'
import styles from './analytics.module.scss'
import MultilingualCourseAvailability from './MultilingualCourseAvailability'
import MyCoursesAvailability from './MyCoursesAvailability'


export default function MultilingualAndMyCourseAvailability() {
  return (
    <div className={`${styles.categoryAndExpertiseAvailability}`}>
        <MultilingualCourseAvailability/>
        <MyCoursesAvailability />
    </div>
    
  )
}
