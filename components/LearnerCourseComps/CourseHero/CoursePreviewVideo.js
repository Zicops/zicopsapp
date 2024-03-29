import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import VideoPlayer from '../common/VideoPlayer';
import styles from '../learnerCourseComps.module.scss';
import CourseHeroTopBar from './CourseHeroTopBar';
import TopBarCenterTitle from './CourseHeroTopBar/TopBarCenterTitle';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';

export default function CoursePreviewVideo() {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const coursePreviewRef = useRef(null);

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
