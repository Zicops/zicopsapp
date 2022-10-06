import { IsCourseSavedAtom } from '@/components/Tabs/Logic/tabs.helper';
import { COURSE_TYPES, DEFAULT_VALUES } from '@/helper/constants.helper';
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
  const [isCourseSaved, setIsCourseSaved] = useRecoilState(IsCourseSavedAtom);

  const [isCourseLoaded, setIsCourseLoaded] = useState(false);

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

        const _course = data?.getCourse;
        if (_course?.image?.includes(DEFAULT_VALUES.image)) _course.image = '';
        if (_course?.tileImage?.includes(DEFAULT_VALUES.tileImage)) _course.tileImage = '';
        if (_course?.previewVideo?.includes(DEFAULT_VALUES.previewVideo)) _course.previewVideo = '';
        if (data?.getCourse) updateCourseMaster(_course);
        setIsCourseLoaded(true);
      }
    );
  }, [editCourseId]);

  useEffect(() => {
    if (isCourseLoaded) setIsCourseSaved(true);
  }, [isCourseLoaded]);

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
