import Sidebar from '../../components/Sidebar';
import ZicopsCourseList from '../../components/adminComps/ZicopsCourses/ZicopsCourseList';
import ZicopsCourseTable from '../../components/ZicopsCourseTable';
import CourseHead from '../../components/CourseHead';

const ZicopsCourses = () => {
  return (
    <div>
      <Sidebar />
      {/* <AdminContent /> */}

      <div className={`adminContent`}>
        <CourseHead title="Zicops Course Offerings" />

        <ZicopsCourseList />
        {/* <ZicopsCourseTable /> */}
      </div>
    </div>
  );
};

export default ZicopsCourses;
