// import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import { ASSIGNED_COURSES } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';

const CurrentCourses = ({ courseData, handleSubmit = () => {}, isLoading = false}) => {

  const [loading,setLoading] = useState(isLoading);

  const [onGoingCourses , setOnGoingCourses] = useState([]);
  const [assignedCourses , setAssignedCourses] = useState([]);
  const [addedCourses , setAddedCourses] = useState([]);
  const [cohortCourses , setCohortCourses] = useState([]);

  

  const courseSections = [
    { displayType: 'Ongoing Courses', footerType: 'onGoing', data: onGoingCourses },
    { displayType: 'Courses Added by Admin', footerType: 'adminFooter', data: assignedCourses , isRemove:true , handleAssign:handleSubmit , buttonText:'Remove'},
    { displayType: 'Courses Added by Learner', footerType: 'added', data: addedCourses },
    { displayType: 'Courses Added In Cohort', footerType: 'added', data: cohortCourses }
  ];

  useEffect(()=>{
    if(!courseData?.length) return ;
    // console.log(courseData);
    const role = courseData?.addedby?.role.toLowerCase() ;
    setOnGoingCourses([...courseData.filter((courses) => courses.completedPercentage)],setLoading(false))
    setAssignedCourses([...courseData?.filter(
      (course) => role === ASSIGNED_COURSES[1]
    )],setLoading(false))
    setAddedCourses([...courseData?.filter(
      (course) => !ASSIGNED_COURSES?.includes(role))],setLoading(false))
    
    setCohortCourses([...courseData?.filter(
      (course) => role === ASSIGNED_COURSES[0] || role === ASSIGNED_COURSES[2]
    )],setLoading(false))

  },[courseData])

  return (
    <>
      {courseSections.map((section,index) => {
          return (
            <div key={index}>
            <CardContainer
              type={section?.displayType}
              footerType={section?.footerType}
              courseData={section?.data}
              statusData={section?.statusData}
              isRemove={section?.isRemove ? section?.isRemove : false}
              handleSubmit={section?.handleAssign ?section?.handleAssign : ()=>{} }
              buttonText={ section?.buttonText ? section?.buttonText : ''}
              isLoading={loading}
              isAdmin={true}
              customStyles={{fontSize:'15px'}}
            /></div>
          );
        })}
    </>
  );
};

export default CurrentCourses;
