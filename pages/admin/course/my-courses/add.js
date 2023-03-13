import AdminCourseTabs from '@/components/AdminCourseComps/AdminCourseTabs';
import CoursePageTitle from '@/components/AdminCourseComps/CoursePageTitle';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { courseSidebarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import {
  CourseCurrentStateAtom,
  CourseMetaDataAtom,
  getCourseCurrentStateObj,
  getCourseMetaDataObj
} from '@/state/atoms/courses.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function AddCoursePage() {
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const [courseCurrentState, setCourseCurrentState] = useRecoilState(CourseCurrentStateAtom);
  const userOrg = useRecoilValue(UsersOrganizationAtom);

  // set default values
  useEffect(() => {
    if (!userOrg?.lsp_id) return;

    setCourseMetaData(getCourseMetaDataObj({ isDisplay: true, lspId: userOrg?.lsp_id }));
    setCourseCurrentState(getCourseCurrentStateObj({ isSaved: true }));
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
