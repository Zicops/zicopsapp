import React, { Component } from 'react'
import Select from 'react-select'
import styles from '../../styles/CourseHead.module.css'

const CourseHead = ({title}) => {
  const options = [
    { value: 'self-paced', label: 'Self Paced' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'labs', label: 'Labs' },
    { value: 'test', label: 'Test' }
  ]
    return (
        <div className={styles.add_course_head}>
          <div className={styles.head}>
            <h2>{title}</h2>
              <Select 
              instanceId="coursehead_coursetype"
              options={options} 
              defaultValue={{ value: 'self-paced', label: 'Self Paced' }}
              className='zicops_select_container'
              classNamePrefix="zicops_select"
              />
          </div>
          <div className={styles.icons}>
            <img src="/images/setting_icon.png" className="rightside_icon" alt="" />
            <img src="/images/sitemap_icon.png" className="rightside_icon" alt="" />
          </div>
        </div>
    )
}

export default CourseHead