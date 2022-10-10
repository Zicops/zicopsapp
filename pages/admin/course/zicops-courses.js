import Sidebar from '../../../components/common/Sidebar';
import ZicopsCourseList from '../../../components/adminComps/ZicopsCourses/ZicopsCourseList';
import ZicopsCourseTable from '../../../components/ZicopsCourseTable';
import CourseHead from '../../../components/CourseHead';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';

const ZicopsCourses = () => {
  return (
    <div>
      <Sidebar sidebarItemsArr={courseSidebarData} />
      {/* <AdminContent /> */}

      <div className={`adminContent`}>
        <CourseHead
          title="Zicops Course Offerings"
          tooltipTitle={ADMIN_COURSES.zicopsCourses.addBtn}
        />

        <ZicopsCourseList />
        {/* <ZicopsCourseTable /> */}
      </div>
    </div>
  );
};

export default ZicopsCourses;
