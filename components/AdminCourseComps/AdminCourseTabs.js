import TabContainer from '@/common/TabContainer';
import { COURSE_STATUS } from '@/constants/course.constants';
import { getDateTimeFromUnix } from '@/helper/utils.helper';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { courseTabs } from './Logic/adminCourseComps.helper';
import useHandleCourseData from './Logic/useHandleCourseData';
import useSaveCourseData from './Logic/useSaveCourseData';

export default function AdminCourseTabs() {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const courseCurrentState = useRecoilValue(CourseCurrentStateAtom);
  const router = useRouter();
  const courseId = router.query.courseId;

  const { activeCourseTab, setActiveCourseTab, saveCourseMeta } = useSaveCourseData();
  const { isDataPresent } = useHandleCourseData();

  const tabData = Object.keys(courseTabs).map((key) => ({
    name: courseTabs[key].name,
    component: courseMetaData?.id !== courseId ? <Spinner /> : courseTabs[key].component
  }));

  function getTabFooterObj() {
    const isCourseMasterDataFilled = isDataPresent([courseTabs.courseMaster.name])?.length;
    const displayCourseStatus = () => {
      if (courseCurrentState.isUpdating) return 'UPDATING...';

      return (
        <>
          {courseMetaData.status || COURSE_STATUS.draft}{' '}
          <span style={{ fontSize: '12px', fontWeight: '400' }}>
            {(courseMetaData.updatedAt || courseMetaData.createdAt) &&
              `(at ${getDateTimeFromUnix(courseMetaData.updatedAt || courseMetaData.createdAt)})`}
          </span>
        </>
      );
    };
    const getIsSubmitBtnDisabled = () => {
      if (courseCurrentState?.isUpdating) return true;

      return isCourseMasterDataFilled;
    };
    const getSubmitBtnText = () => {
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
            clickHandler={() => router.push(`/course/${courseId}/devPage`)}
            text="Preview"
          />
        )}
      </TabContainer>
    </>
  );
}
