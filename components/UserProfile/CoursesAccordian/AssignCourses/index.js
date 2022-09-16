import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import CoursesAccHead from '../../CoursesAccHead';

const AssignCourses = ({
  section,
  isHead = false,
  isFolder = false,
  isRemove = false,
  handleSubmit = () => {},
  handleClick = () => {},
  buttonText = '',
  type = null,
  assignedCourses = []
}) => {
  let courseData = section.data;
  if (type === 'currentCourses')
    courseData = courseData.filter((courses) => courses.completedPercentage);

  // if (type === 'assignedCourses')
  //   courseData = courseData.filter((courses) => !courses.completedPercentage );

  if (type === 'assignCourses' && assignedCourses?.length) {
    courseData = courseData.filter(
      (courses) => assignedCourses?.findIndex((obj) => obj.id === courses.id) < 0
    );
  }

  return (
    <>
      {isHead && (
        <CoursesAccHead
          isFolder={isFolder}
          courseCount={assignedCourses?.filter((courses) => !courses.completedPercentage)?.length}
          handleClick={handleClick}
        />
      )}

      <CardContainer
        isAdmin={true}
        hideTopBar={true}
        type={section.displayType}
        footerType={section.footerType}
        courseData={courseData}
        handleSubmit={handleSubmit}
        buttonText={buttonText}
        isRemove={isRemove}
      />
    </>
  );
};

export default AssignCourses;
