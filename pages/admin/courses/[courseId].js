import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutationClient } from '../../../API/Mutations';
import AdminHeader from '../../../components/common/AdminHeader';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
import Sidebar from '../../../components/common/Sidebar';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import CourseTabs from '../../../components/Tabs';
import CourseContextProvider from '../../../state/contexts/CourseContext';
import ModuleContextProvider from '../../../state/contexts/ModuleContext';

export default function EditCoursePage() {
  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader title="Edit Course" />

        <ApolloProvider client={mutationClient}>
          <CourseContextProvider>
            <ModuleContextProvider>
              <MainBodyBox>
                <CourseTabs />
              </MainBodyBox>
            </ModuleContextProvider>
          </CourseContextProvider>
        </ApolloProvider>
      </MainBody>
    </>
  );
}
