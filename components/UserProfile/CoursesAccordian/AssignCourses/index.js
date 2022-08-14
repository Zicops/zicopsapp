import { courseData } from '@/components/LearnerUserProfile/Logic/userBody.helper';
import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import CoursesAccHead from '../../CoursesAccHead';
import styles from '../coursesAccordian.module.scss';


const AssignCourses = ({
  section,
  isHead = true,
  isFolder = false,
  handleSubmit = () => {},
  handleClick = () => {},
  buttonText = ''
}) => {

  return (
    <>
      {isHead && <CoursesAccHead isFolder={isFolder} handleClick={handleClick} />}

      <CardContainer
        isAdmin={true}
        type={section.displayType}
        footerType={section.footerType}
        courseData={section.data}
        handleSubmit={handleSubmit}
        buttonText={buttonText}

      />
    </>
  );
};

export default AssignCourses;
