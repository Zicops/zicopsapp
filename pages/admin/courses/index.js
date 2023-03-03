import { getDefaultLsp } from '@/components/Tabs/Logic/tabs.helper';
import { COURSE_TYPES } from '@/helper/constants.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { ApolloProvider } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mutationClient } from '../../../API/Mutations';
import AdminHeader from '../../../components/common/AdminHeader';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
import Sidebar from '../../../components/common/Sidebar';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import CourseTabs from '../../../components/Tabs';
import { courseContext } from '../../../state/contexts/CourseContext';

export default function AddCoursePage() {
  const { updateCourseMaster } = useContext(courseContext);
  const [courseType, setCourseType] = useState(COURSE_TYPES[0]);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  // reset context state
  useEffect(() => {
    const type = localStorage.getItem('courseType') || COURSE_TYPES[0];
    setCourseType(type);
    updateCourseMaster({
      type,
      lspId: userOrgData?.lsp_id || sessionStorage.getItem('lsp_id'),
      is_display: true
    });

    defaultLsp();
  }, []);

  async function defaultLsp() {
    const orgId = sessionStorage?.getItem('org_id');
    const defaultLsp = await getDefaultLsp(orgId);
    // console.log(defaultLsp)
    setUserOrgData((prevValue) => ({ ...prevValue, defaultLsp: defaultLsp }));
  }

  function getPageTitle() {
    if (courseType === COURSE_TYPES[0]) return 'Add New Course';
    if (courseType === COURSE_TYPES[3]) return 'Add New Test Series';

    return 'Add';
  }

  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader title={getPageTitle()} />

        <ApolloProvider client={mutationClient}>
          <MainBodyBox>
            <CourseTabs />
          </MainBodyBox>
        </ApolloProvider>
      </MainBody>
    </>
  );
}
