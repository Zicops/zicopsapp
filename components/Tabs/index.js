import { COURSE_STATUS, USER_LSP_ROLE } from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
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

  const { updateCourseMaster } = courseContextData;
  const { fullCourse, saveCourseData } = useSaveCourse(courseContextData);
  const router = useRouter();
  const [courseStatus, setCourseStatus] = useState(fullCourse?.status);
  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const isCourseUploading = useRecoilValue(isCourseUploadingAtom);
  const [isCourseSaved, setIsCourseSaved] = useRecoilState(IsCourseSavedAtom);
  const [featureFlags, setFeatureFlags] = useRecoilState(FeatureFlagsAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  // TODO: set to first tab when new course is opened
  // useEffect(() => {
  //   console.log(router);
  //   setTab(tabData[0].name);
  // }, [fullCourse?.id]);

  useEffect(() => {
    if (router.asPath === '/admin/courses') setTab(tabData[0].name);
  }, []);

  // make published course editable
  useEffect(() => {
    if (!fullCourse.id) return;

    const isEditableData = localStorage.getItem('isPublishCourseEditable') === 'true';
    const publishPassword = localStorage.getItem('publishPassword');

    const val = isEditableData && publishPassword === fullCourse.id;
    console.log(val);
    setFeatureFlags((prev) => ({ ...prev, isPublishCourseEditable: !!val }));
  }, [fullCourse.id]);

  useEffect(() => {
    setIsCourseSaved(false);
  }, [fullCourse]);

  useEffect(() => {
    if (!isCourseSaved) return;
    let _status = fullCourse.status || STATUS.display[0];
    if (fullCourse?.qa_required) _status = COURSE_STATUS.freeze;
    if (fullCourse?.status === COURSE_STATUS.publish) _status = COURSE_STATUS.publish;
    if (fullCourse?.status === COURSE_STATUS.reject) _status = 'EXPIRED';
    if (fullCourse?.status === COURSE_STATUS.approvalPending)
      _status = COURSE_STATUS.approvalPending;

    setCourseStatus(_status);
  }, [fullCourse?.status, isCourseSaved]);

  useEffect(() => {
    if (!fullCourse?.qa_required) setCourseStatus(COURSE_STATUS.save);
  }, [fullCourse?.qa_required]);

  useEffect(() => {
    if (
      isCourseSaved ||
      [COURSE_STATUS.publish, COURSE_STATUS.reject].includes(fullCourse.status)
    ) {
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

  function getSubmitBtnText() {
    if (featureFlags.isPublishCourseEditable) return 'Published (U)';
    if ([COURSE_STATUS.publish, 'EXPIRED'].includes(courseStatus)) return 'Published';
    if (userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor)) {
      if (courseStatus === COURSE_STATUS.approvalPending) return 'Sent For Approval';
      if (fullCourse?.qa_required) return 'Send For Approval';
    }
    if (courseStatus === COURSE_STATUS.freeze) return 'Publish';
    if (fullCourse?.id) return 'Update';

    return 'Save';
  }

  function getIsSubmitBtnDisabled() {
    if (featureFlags.isPublishCourseEditable) return false;
    if (!!isCourseUploading) return true;
    if (
      userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor) &&
      courseStatus === COURSE_STATUS.approvalPending
    )
      return true;
    if ([COURSE_STATUS.publish, COURSE_STATUS.reject, 'EXPIRED'].includes(courseStatus))
      return true;

    return false;
  }

  function getIsPublishing() {
    // if (featureFlags.isPublishCourseEditable) return true;
    if (userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor)) return false;
    if (courseStatus === COURSE_STATUS.freeze || courseStatus === COURSE_STATUS.approvalPending)
      return true;

    return false;
  }

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        isDisabled={!!isCourseUploading}
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
              {courseStatus || STATUS.display[0]}{' '}
              <span style={{ fontSize: '12px', fontWeight: '400' }}>
                {isCourseUploading ? '' : displayTime}
              </span>
            </>
          ),
          submitDisplay: getSubmitBtnText(),
          disableSubmit: getIsSubmitBtnDisabled(),
          handleSubmit: () => saveCourseData(false, null, true, getIsPublishing()),
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
