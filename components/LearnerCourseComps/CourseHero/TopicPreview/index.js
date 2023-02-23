import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '../../atoms/learnerCourseComps.atom';
import useHandleTopicProgress from '../../Logic/useHandleTopicProgress';
import CourseHeroTopBar from '../CourseHeroTopBar';
import TopBarCenterTitle from '../CourseHeroTopBar/TopBarCenterTitle';

export default function TopicPreview() {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const { containerRef } = useHandleTopicProgress();

  return (
    <>
      <div ref={containerRef}>
        <CourseHeroTopBar
          centerComps={<TopBarCenterTitle title={courseMeta?.name} subtitle="Preview Video" />}
        />
        Course Topic Preview
      </div>
    </>
  );
}
