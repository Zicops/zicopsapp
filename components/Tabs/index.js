import { STATUS } from '@/state/atoms/utils.atoms';
import Router, { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../state/contexts/CourseContext';
import Button from '../common/Button';
import TabContainer from '../common/TabContainer';
import styles from './courseTabs.module.scss';
import {
  CourseTabAtom,
  getDateTimeFromUnix,
  IsCourseSavedAtom,
  isCourseUploadingAtom,
  tabData
} from './Logic/tabs.helper';
import useSaveCourse from './Logic/useSaveCourse';
export default function CourseTabs() {
  const courseContextData = useContext(courseContext);

  const { fullCourse, saveCourseData } = useSaveCourse(courseContextData);
  const router = useRouter();
  const [showConfirmBox, setShowConfirmBox] = useState(0);
  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const isCourseUploading = useRecoilValue(isCourseUploadingAtom);
  const [isCourseSaved, setIsCourseSaved] = useRecoilState(IsCourseSavedAtom);

  // TODO: set to first tab when new course is opened
  // useEffect(() => {
  //   console.log(router);
  //   setTab(tabData[0].name);
  // }, [fullCourse?.id]);

  useEffect(() => {
    setIsCourseSaved(false);
  }, [fullCourse]);

  useEffect(() => {
    if (isCourseSaved) {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
      return;
    }

    const confirmationMessage = 'Changes you made may not be saved. Do you still wish to exit?';
    function beforeUnloadHandler(e) {
      (e || window.event).returnValue = confirmationMessage;

      // setShowConfirmBox(1);
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    }

    function beforeRouteHandler(url) {
      // console.log(url);
      // return false;
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        // setShowConfirmBox(1);
        router.push(`${router.asPath}?shallowRoute=true`, router.asPath, { shallow: true });
        Router.events.emit('routeChangeError');

        // if (showConfirmBox !== 2)
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    }

    window.addEventListener('beforeunload', beforeUnloadHandler);
    Router.events.on('routeChangeStart', beforeRouteHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [isCourseSaved]);

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     return 'Are you sure you want to leave?';
  //   };
  // }, []);
  // useEffect(() => {
  //   const confirmationMessage = 'Changes you made may not be saved.';
  // const beforeUnloadHandler = (e) => {
  //   (e || window.event).returnValue = confirmationMessage;
  //   // setShowConfirmBox(1);
  //   return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
  // };
  //   const beforeRouteHandler = (url) => {
  //     if (Router.pathname !== url && !confirm(confirmationMessage)) {
  //       // setShowConfirmBox(1);
  //     // if (Router.pathname !== url && showConfirmBox === 0) {

  //       // if (showConfirmBox === 2) {
  //         // to inform NProgress or something ...
  //         Router.events.emit('routeChangeError');
  //         // tslint:disable-next-line: no-string-throw
  //         throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
  //       // }

  //     }
  //   };
  //   // if (notSaved) {
  //     window.addEventListener('beforeunload', beforeUnloadHandler);
  //     Router.events.on('routeChangeStart', beforeRouteHandler);
  //   // } else {
  //   //   window.removeEventListener('beforeunload', beforeUnloadHandler);
  //   //   Router.events.off('routeChangeStart', beforeRouteHandler);
  //   // }
  //   return () => {
  //     window.removeEventListener('beforeunload', beforeUnloadHandler);
  //     Router.events.off('routeChangeStart', beforeRouteHandler);
  //   };
  // }, []);

  const displayTime =
    fullCourse.updated_at || fullCourse.created_at
      ? `(at ${getDateTimeFromUnix(fullCourse.updated_at || fullCourse.created_at)})`
      : '';

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          isActive:
            fullCourse?.name &&
            fullCourse?.category &&
            fullCourse?.sub_category &&
            fullCourse?.owner &&
            fullCourse?.language?.length,
          status: isCourseUploading ? (
            isCourseUploading
          ) : (
            <>
              {fullCourse.status || STATUS.display[0]}{' '}
              <span style={{ fontSize: '12px', fontWeight: '400' }}>
                {isCourseUploading ? '' : displayTime}
              </span>
            </>
          ),
          submitDisplay: fullCourse.id ? 'Update' : 'Save',
          disableSubmit: !!isCourseUploading,
          handleSubmit: () => saveCourseData(false),
          cancelDisplay: 'Cancel',
          handleCancel: () => router.push('/admin/course/my-courses')
        }}>
        {fullCourse.id && (
          <div className={`${styles.previewButtonContainer}`}>
            <Button
              clickHandler={async () => {
                await saveCourseData(false, 0, false);
                router.push(`/preview?courseId=${fullCourse.id}`);
              }}
              text="Preview"
            />
          </div>
        )}
      </TabContainer>

      {/* {showConfirmBox === 1 && (
        <ConfirmPopUp
          title={
            'Are you sure about deleting this course? This will delete the course permanently!'
          }
          btnObj={{
            handleClickLeft: () => {
              // updateCourseMaster({ ...fullCourse, is_active: false });
              setShowConfirmBox(2);
            },
            handleClickRight: () => setShowConfirmBox(0)
          }}
        />
      )} */}
    </>
  );
}
