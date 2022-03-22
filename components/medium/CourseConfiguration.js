import React, { useEffect, useState, useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import BulletPointInput from '../small/BulletPointInput'
import DatePicker from "react-datepicker";
import SlideButton from '../small/SlideButton';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../../styles/CourseMaster.module.css'

const CourseConfiguration = () => {

  const { fullCourse, setTab, updateCourseMaster } = useContext(courseContext);

  let pubDate = (fullCourse.publish_date > 0) ? new Date(fullCourse.publish_date * 1000) : new Date();
  let expDate = (fullCourse.expiry_date > 0) ? new Date(fullCourse.expiry_date * 1000) : new Date();

  const [publishDate, setPublishDate] = useState(pubDate);
  const [expireDate, setExpireDate] = useState(expDate);
  const years = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* <span onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                      {"<"}
                    </span> */}
      <select
        value={'2022'}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        // value={months[getMonth(date)]}
        onChange={({ target: { value } }) =>
          changeMonth(months.indexOf(value))
        }
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      {">"}
                    </button> */}
    </div>
  )

  // expiry_date 
  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      expiry_date: Math.floor(expireDate / 1000).toString(),
    })
  }, [expireDate])
  
  // publish_date
  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      publish_date: Math.floor(publishDate / 1000).toString(),
    })
  }, [publishDate])


    return (
        <div className="course_master">
          <div className="row">
            <label htmlFor="name" className="col_25">Publish Date</label>
            <div className="col_25">
                <DatePicker 
                dateFormat="dd/MM/yyyy"
                renderCustomHeader={CustomHeader}
                selected={publishDate} 
                onChange={(date) => setPublishDate(date)} 
                className="calender_body"
                dayClassName={()=>'calander_dates'}
                />
            </div>
            <label htmlFor="name" className="col_25" style={{ textAlign: 'center' }}><span>Expire Date</span></label>
            <div className="col_25">
                <DatePicker 
                dateFormat="dd/MM/yyyy"
                renderCustomHeader={CustomHeader}
                selected={expireDate} 
                onChange={(date) => setExpireDate(date)} 
                className="calender_body"
                dayClassName={()=>'calander_dates'}
                />
            </div>
          </div>
          <div className="row">
            <label htmlFor="name" className="col_25">Quality Control Check</label>
            <div className="col_25">
            <SlideButton />
            </div>
            <div className="col_25"></div>
            <div className="col_25"></div>
          </div>
        {/* <div className={styles.row}>
          <label htmlFor="name" className={styles.col_25}>Add Approval</label>
          <div className={styles.col_75}>
            <BulletPointInput placeholder="Add Approval" 
            name="approvers"
            course={fullCourse}
            updateCourse={updateCourseMaster}/>
          </div>
        </div> */}
          <div className="row">
            <label htmlFor="name" className="col_25">Visibility in the Learning space</label>
            <div className="col_25">
            <SlideButton />
            </div>
            <div className="col_25"></div>
            <div className="col_25"></div>
          </div>
        </div>
    )
}

export default CourseConfiguration