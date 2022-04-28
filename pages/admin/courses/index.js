import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mutationClient } from '../../../API/Mutations';
import CourseHead from '../../../components/CourseHead';
import Sidebar from '../../../components/Sidebar';
import CourseTabs from '../../../components/Tabs';
import AdminFooter from '../../../components/Tabs/AdminFooter';
import CourseContextProvider from '../../../state/contexts/CourseContext';

export default function Courses() {
  const router = useRouter();
  const [isCourseIdPresent, setIsCourseIdPresent] = useState(false);

  useEffect(() => {
    setIsCourseIdPresent(router?.query?.courseId ? true : false);
  }, [router]);

  return (
    <div>
      <Sidebar />

      <div className={`adminContent`}>
        <CourseHead title={isCourseIdPresent ? 'Edit Course' : 'Add New Course'} />

        <ApolloProvider client={mutationClient}>
          <CourseContextProvider>
            <CourseTabs />

            <AdminFooter />
          </CourseContextProvider>
        </ApolloProvider>
      </div>
    </div>
  );
}
