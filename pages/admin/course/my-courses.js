import MyCourseList from '../../../components/adminComps/ZicopsCourses/MyCourseList';
import CourseHead from '../../../components/CourseHead';
import Sidebar from '../../../components/common/Sidebar';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';

const MyCourses = () => {
  return (
    <div>
      <Sidebar sidebarItemsArr={courseSidebarData} />
      <div className={`adminContent`}>
        <CourseHead title="My Courses" isShowOption={true} pageRoute="/admin/courses" />
        <MyCourseList />
      </div>
    </div>
  );
};

export default MyCourses;
