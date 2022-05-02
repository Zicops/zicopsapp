import MyCourseList from '../../components/adminComps/ZicopsCourses/MyCourseList';
import CourseHead from '../../components/CourseHead';
import Sidebar from '../../components/Sidebar';

const MyCourses = () => {
  return (
    <div>
      <Sidebar />
      <div className={`adminContent`}>
        <CourseHead title="My Courses" />
        <MyCourseList />
      </div>
    </div>
  );
};

export default MyCourses;
