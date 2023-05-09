import React, { useContext } from 'react';
import Info2 from './Info2';
import { courseContext } from '@/state/contexts/CourseContext';
import styles from './paymentCourse.module.scss';
import Info3 from './Info3';
import { Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
const FeeDetails = () => {
  const { fullCourse } = useContext(courseContext);
  const {
    name: courseTitle,
    benefits,
    summary,
    image,
    expertise_level: expertiseLevel,
    language,
    instructor,
    category,
    sub_category: subCategory,
    duration,
    type,
    owner: provisionedBy,
    publisher: publishedBy,
  } = fullCourse;
  console.info(fullCourse);
  const useTooltipStyles = makeStyles((theme) => ({
    tooltip: {
      backgroundColor: '#040404',
      fontSize: '16px',
      padding: '12px',
    },
  }));
  const tooltipClass = useTooltipStyles();
  return (
    <div className={`${styles.feesContainer}`}>
      <div
        className={`${styles.feesTopContainer}`}
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
        <div className={`${styles.gradient}`}>
          <div className={`${styles.courseSummary}`}>{summary}</div>
          <div className={`${styles.courseTitleMain}`}>
            <div className={`${styles.courseTitle}`}>
              {courseTitle} by {publishedBy} ; From {provisionedBy}
            </div>
            <div className={`${styles.courseType2}`}>
              <img src="/images/svg/videocam.svg" alt="" />
              {type}
            </div>
          </div>
          <div className={`${styles.feesFlexContainer}`}>
            <Info2 name="Course owner" data={publishedBy} />
            <Info2 name="Course Provisioner" data={provisionedBy} />
          </div>
          <div className={`${styles.courseInstrutor}`}>
            <Info2 name="Instructors" data={instructor} />
          </div>
          <div className={`${styles.feesFlexContainer}`}>
            <Info2 name="Category" data={category} />
            <Info2 name="Sub-category" data={subCategory} />
          </div>
          <div className={`${styles.feesFlexContainer}`}>
            <Info2 name="Course start date" data="05/05/2023" />
            <Info2 name="Course end date" data=" 08/05/2023" />
          </div>
          <div className={`${styles.durationContainer}`}>
            <div className={`${styles.durationMain}`}>
              <img src="/images/svg/fees.svg " alt="" />
              <span>Total duration: 3 days</span>
            </div>
            <div className={`${styles.durationMain}`}>
              <img src="/images/svg/fees1.svg " alt="" />
              <span>Learning duration: 3 days</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.feesBottomMain}`}>
        <p>Fee details</p>
        <Info3 name="Classroom Training" data="1000" />
        <Info3 name="GST" data="100" />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="col_50" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tooltip
              title="What is convenience fees? 
          Continence dee is a service charge levied by Zicops Pvt Ltd. Continence fee will not be refundable in case of returns"
              placement="bottom-start"
              classes={tooltipClass}>
              <span style={{ color: '#ACACAC' }}>Convenience Fee</span>
            </Tooltip>
            <p>:</p>
          </div>
          <div className="col_50" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            500
          </div>
        </div>

        <div className={`${styles.hr}`}></div>
        <Info3 name="Total amount payable" data="1600" />
        <div className={`${styles.hr}`}></div>
      </div>
    </div>
  );
};

export default FeeDetails;
