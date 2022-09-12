import { COURSE_TYPES } from '@/helper/constants.helper';
import { ApolloProvider } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
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

  // reset context state
  useEffect(() => {
    const type = localStorage.getItem('courseType') || COURSE_TYPES[0];
    setCourseType(type);
    updateCourseMaster({ type });
  }, []);

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
