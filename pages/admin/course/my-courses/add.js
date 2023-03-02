import AdminCourseComps from '@/components/AdminCourseComps';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { courseSidebarData } from '@/components/common/Sidebar/Logic/sidebar.helper';

export default function AddCoursePage() {
  function getPageTitle() {
    // if (courseType === COURSE_TYPES[0]) return 'Add New Course';
    // if (courseType === COURSE_TYPES[3]) return 'Add New Test Series';

    return 'Add New Course';
  }

  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader title={getPageTitle()} />

        <MainBodyBox>
          {/* <CourseTabs /> */}
          <AdminCourseComps />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
