import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';

const CohortAssignedCourses = ({ section, handleSubmit = () => {}, isRemove = false , isLoading = false }) => {
  return (
    <>
      <CardContainer
        hideTopBar={true}
        isAdmin={true}
        type={section.displayType}
        footerType={section.footerType}
        courseData={section.data}
        buttonText={'Remove'}
        handleSubmit={handleSubmit}
        isRemove={isRemove}
        isLoading={isLoading}
      />
    </>
  );
};

export default CohortAssignedCourses;
