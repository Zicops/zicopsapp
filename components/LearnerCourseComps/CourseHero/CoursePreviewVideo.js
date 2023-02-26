import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ActiveCourseHeroAtom, CourseMetaDataAtom } from '../atoms/learnerCourseComps.atom';
import VideoPlayer from '../common/VideoPlayer';
import styles from '../learnerCourseComps.module.scss';
import CourseHeroTopBar from './CourseHeroTopBar';
import TopBarCenterTitle from './CourseHeroTopBar/TopBarCenterTitle';

export default function CoursePreviewVideo() {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const coursePreviewRef = useRef(null);
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);

  return (
    <div ref={coursePreviewRef} className={styles.courseHeroContainer}>
      <CourseHeroTopBar
        centerComps={<TopBarCenterTitle title={courseMeta?.name} subtitle="Preview Video" />}
      />

      <VideoPlayer
        containerRef={coursePreviewRef}
        videoData={{ src: courseMeta?.previewVideo || '', isAutoPlay: true }}
      />
    </div>
  );
}
