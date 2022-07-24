import { courseData } from '@/components/LearnerUserProfile/Logic/userBody.helper';
import CoursesAccHead from '@/components/UserProfile/CoursesAccHead';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import styles from '../../../userComps.module.scss';


const CohortMapping = () => {

  const courseSections = [
    // { displayType: 'Ongoing Courses', footerType: 'onGoing', data: courseData },
    // { displayType: 'Courses Added by Me', footerType: 'added', data: courseData },
    { displayType: 'Assigned Course', footerType: 'adminFooter', data: courseData },
    { displayType: 'All Course', footerType: 'adminFooter', data: courseData }
  ];

  return (
    <>
      <CoursesAccHead />
      <div className={`${styles.userTabContainer}`}>
        {courseSections.map((section) => {
          return (
            <CardContainer
              isAdmin={true}
              type={section.displayType}
              footerType={section.footerType}
              courseData={section.data}
            />
          );
        })}
      </div>
    </>
  );
};

export default CohortMapping;
