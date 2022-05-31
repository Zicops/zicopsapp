import { ApolloProvider } from '@apollo/client';
import { useContext, useEffect } from 'react';
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

  // reset context state
  useEffect(() => {
    updateCourseMaster({});
  }, []);

  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader title="Add New Course" />

        <ApolloProvider client={mutationClient}>
          <MainBodyBox>
            <CourseTabs />
          </MainBodyBox>
        </ApolloProvider>
      </MainBody>
    </>
  );
}
