import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import MyCourseList from '../../../components/adminComps/ZicopsCourses/MyCourseList';
import Sidebar from '../../../components/common/Sidebar';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import CourseHead from '../../../components/CourseHead';

const MyCourses = () => {
  return (
    <div>
      <Sidebar sidebarItemsArr={courseSidebarData} />
      <div className={`adminContent`}>
        <CourseHead
          title="My Courses"
          isShowOption={true}
          pageRoute="/admin/courses"
          tooltipTitle={ADMIN_COURSES.myCourses.addBtn}
        />
        <MyCourseList />
      </div>
    </div>
  );
};

export default MyCourses;
