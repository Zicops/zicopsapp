import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';

const AllCourses = ({ section, handleSubmit = () => {} , isLoading = false}) => {
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
        isLoading={isLoading}
      />
    </>
  );
};

export default AllCourses;
