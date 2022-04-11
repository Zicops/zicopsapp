import Sidebar from '../../components/Sidebar';
import MyCourseList from '../../components/adminComps/ZicopsCourses/MyCourseList';
import ZicopsCourseTable from '../../components/ZicopsCourseTable';
import CourseHead from '../../components/CourseHead';

const MyCourses = () => {
  return (
    <div>
      <Sidebar />
      {/* <AdminContent /> */}

      <div className={`adminContent`}>
        <CourseHead title="My Courses" />

        <MyCourseList />
        {/* <ZicopsCourseTable /> */}
      </div>
    </div>
  );
};

export default MyCourses;
