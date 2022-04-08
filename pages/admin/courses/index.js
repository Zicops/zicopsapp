import { ApolloProvider } from '@apollo/client';
import { mutationClient } from '../../../API/Mutations';
import AdminFooter from '../../../components/AdminFooter';
import CourseHead from '../../../components/CourseHead';
import Sidebar from '../../../components/Sidebar';
import Tabs from '../../../components/Tabs';
import CourseContextProvider from '../../../state/contexts/CourseContext';
import { adminContent } from './courses.module.scss';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function Courses() {
  const router = useRouter();
  const [isCourseIdPresent, setIsCourseIdPresent] = useState(false);

  useEffect(() => {
    console.log(router?.query?.courseId);
    setIsCourseIdPresent(router?.query?.courseId ? true : false);
  }, [router]);

  return (
    <div>
      <Sidebar />

      <div className={`${adminContent}`}>
        <CourseHead title= {isCourseIdPresent? 'Edit Course': 'Add New Course'} />

        <ApolloProvider client={mutationClient}>
          <CourseContextProvider>
            <Tabs />

            <AdminFooter />
          </CourseContextProvider>
        </ApolloProvider>
      </div>
    </div>
  );
}
