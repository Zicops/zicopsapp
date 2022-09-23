import { COURSE_TYPES } from '@/helper/constants.helper';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mutationClient } from '../../../API/Mutations';
import { GET_COURSE, queryClient } from '../../../API/Queries';
import AdminHeader from '../../../components/common/AdminHeader';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
import Sidebar from '../../../components/common/Sidebar';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import CourseTabs from '../../../components/Tabs';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import { courseContext } from '../../../state/contexts/CourseContext';

export default function EditCoursePage() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const { updateCourseMaster, fullCourse } = useContext(courseContext);
  const router = useRouter();
  const editCourseId = router.query?.courseId || null;
  const [loadCourseData, { error: errorCourseData }] = useLazyQuery(GET_COURSE, {
    client: queryClient
  });

  useEffect(() => {
    if (!editCourseId) return;
    loadCourseData({ variables: { course_id: editCourseId }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        if (errorCourseData) return setToastMsg({ type: 'danger', message: 'course load error' });

        if (data?.getCourse) updateCourseMaster(data.getCourse);
      }
    );
  }, [editCourseId]);

  return (
    <>
      <Sidebar sidebarItemsArr={courseSidebarData} />

      <MainBody>
        <AdminHeader
          title={
            <>
              <h4>{fullCourse?.name}</h4>
              <p style={{ color: 'var(--primary)', fontSize: '18px' }}>[ {fullCourse?.type} ]</p>
            </>
          }
        />

        <ApolloProvider client={mutationClient}>
          <MainBodyBox>
            <CourseTabs />
          </MainBodyBox>
        </ApolloProvider>
      </MainBody>
    </>
  );
}
