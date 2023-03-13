import ZicopsButton from '@/components/common/ZicopsButton';
import { CourseCurrentStateAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import { courseTabs } from './Logic/adminCourseComps.helper';
import useHandleCourseData from './Logic/useHandleCourseData';
import useSaveCourseData from './Logic/useSaveCourseData';

export default function NextBtn() {
  const courseCurrentState = useRecoilValue(CourseCurrentStateAtom);

  const { saveCourseMeta } = useSaveCourseData();
  const { isDataPresent } = useHandleCourseData();

  return (
    <>
      <ZicopsButton
        display="Next"
        handleClick={() => saveCourseMeta()}
        isDisabled={courseCurrentState?.isUpdating}
        fontSize="1rem"
        padding="0.4em 0.5em"
        float="right"
        isActive={!isDataPresent([courseTabs.courseMaster.name]).length}
      />
    </>
  );
}
