import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';

const AllCourses = ({ section, handleSubmit = () => {} }) => {
  return (
    <>
      <CoursesAccHead />
      <CardContainer
        hideTopBar={true}
        isAdmin={true}
        type={section.displayType}
        footerType={section.footerType}
        courseData={section.data}
        buttonText={'Assign'}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AllCourses;
