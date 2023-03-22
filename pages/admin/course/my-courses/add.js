import AdminCourseTabs from '@/components/AdminCourseComps/AdminCourseTabs';
import CoursePageTitle from '@/components/AdminCourseComps/CoursePageTitle';
import { courseTabs } from '@/components/AdminCourseComps/Logic/adminCourseComps.helper';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { courseSidebarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import {
  ActiveCourseTabNameAtom,
  AllCourseModulesDataAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom,
  getCourseCurrentStateObj,
  getCourseMetaDataObj
} from '@/state/atoms/courses.atom';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function AddCoursePage() {
  const courseType = useRecoilValue(CourseTypeAtom);
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabNameAtom);
  const userOrg = useRecoilValue(UsersOrganizationAtom);

  // set default values
  useEffect(() => {
    if (!userOrg?.lsp_id) return;

    // set course master as default tab
    setActiveCourseTab(courseTabs.courseMaster.name);

    // reset all course state
    setCourseMetaData(
      getCourseMetaDataObj({ type: courseType, isDisplay: true, lspId: userOrg?.lsp_id })
    );
    setCourseCurrentState(getCourseCurrentStateObj({ isSaved: true }));
    setAllModules([]);
  }, [userOrg?.lsp_id]);

  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader title={<CoursePageTitle isAddPage={true} />} />

        <MainBodyBox>
          <AdminCourseTabs />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
