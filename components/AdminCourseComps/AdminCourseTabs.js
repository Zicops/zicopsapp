import TabContainer from '@/common/TabContainer';
import { COURSE_STATUS } from '@/constants/course.constants';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import {
  ActiveCourseTabNameAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom
} from '@/state/atoms/courses.atom';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { courseTabs } from './Logic/adminCourseComps.helper';
import useHandleCourseData from './Logic/useHandleCourseData';
import useSaveCourseData from './Logic/useSaveCourseData';

export default function AdminCourseTabs() {
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabNameAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const courseCurrentState = useRecoilValue(CourseCurrentStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const { isPublishCourseEditable } = useRecoilValue(FeatureFlagsAtom);

  const router = useRouter();
  const courseId = router.query.courseId || null;

  const { saveCourseMeta } = useSaveCourseData();
  const { isDataPresent } = useHandleCourseData();

  const isVendor = userOrgData?.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  // set course master as default if state is empty
  if (!activeCourseTab) setActiveCourseTab(courseTabs.courseMaster.name);

  const tabData = Object.keys(courseTabs).map((key) => ({
    name: courseTabs[key].name,
    component:
      !!courseId && courseMetaData.id !== courseId ? <Spinner /> : courseTabs[key].component
  }));

  function getTabFooterObj() {
    const isCourseMasterDataFilled = isDataPresent([courseTabs.courseMaster.name], false);
    const courseStatus = courseMetaData?.status || COURSE_STATUS?.draft;
    const displayCourseStatus = () => {
      // update course api is pending
      if (courseCurrentState.isUpdating) return 'UPDATING...';

      let displayStatus = courseStatus;
      // course is saved and freezed
      if (courseStatus === COURSE_STATUS.save && courseMetaData?.qaRequired)
        displayStatus = COURSE_STATUS?.freeze;
      // course expired
      if (courseStatus === COURSE_STATUS?.reject) displayStatus = 'EXPIRED';

      return (
        <>
          {displayStatus}{' '}
          <span style={{ fontSize: '12px', fontWeight: '400' }}>
            {(courseMetaData.updatedAt || courseMetaData.createdAt) &&
              `(at ${moment((courseMetaData.updatedAt || courseMetaData.createdAt) * 1000)?.format(
                'LLL'
              )})`}
          </span>
        </>
      );
    };
    const getIsSubmitBtnDisabled = () => {
      // api is pending
      if (courseCurrentState?.isUpdating) return true;
      // dev flag for updating published course
      if (isPublishCourseEditable) return false;
      // course is not saved and vendor login
      if (isVendor && courseStatus !== COURSE_STATUS.save) return true;
      // course is published or expired
      if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(courseStatus)) return true;

      return !isCourseMasterDataFilled;
    };
    const getSubmitBtnText = () => {
      // dev flag for updating published courses
      if (!!isPublishCourseEditable) return 'Published (U)';
      // published or expired courses
      if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(courseStatus)) return 'Published';
      // vendor login
      if (isVendor) {
        if (courseStatus === COURSE_STATUS.approvalPending) return 'Sent For Approval';
        if (fullCourse?.qa_required) return 'Send For Approval';
      }
      // course freezed or approval pending
      if (!!courseMetaData?.qaRequired || courseStatus === COURSE_STATUS.approvalPending)
        return 'Publish';
      if (!!courseId) return 'Update';

      return 'Save';
    };

    return {
      isActive: isCourseMasterDataFilled,
      status: displayCourseStatus(),
      submitDisplay: getSubmitBtnText(),
      disableSubmit: getIsSubmitBtnDisabled(),
      handleSubmit: () => saveCourseMeta(),
      handleCancel: () => router.push('/admin/course/my-courses')
    };
  }

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={activeCourseTab}
        setTab={setActiveCourseTab}
        footerObj={getTabFooterObj()}>
        {!!courseMetaData?.id && (
          <Button
            customStyles={{ float: 'right' }}
            clickHandler={() => router.push(`/preview?courseId=${courseId}`)}
            text="Preview"
          />
        )}
      </TabContainer>
    </>
  );
}
