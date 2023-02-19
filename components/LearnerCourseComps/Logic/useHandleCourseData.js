import { GET_COMBINE_COURSE_DATA } from '@/api/Queries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { CourseMetaDataAtom, getCourseMetaDataObj } from '../atoms/learnerCourseComps.atom';

export default function useHandleCourseData() {
  const [courseMeta, setCourseMeta] = useRecoilState(CourseMetaDataAtom);
  const router = useRouter();
  const courseId = router.query.courseId || null;

  loadCourseData();

  async function loadCourseData() {
    if (!courseId) return;
    if (courseId === courseMeta?.id) return;

    const courseDataRes = await loadAndCacheDataAsync(GET_COMBINE_COURSE_DATA, { courseId });

    const _courseMetaData = structuredClone(courseDataRes?.getCourse?.[0] || {});
    setCourseMeta(
      getCourseMetaDataObj({
        ..._courseMetaData,
        subCategory: _courseMetaData?.sub_category,
        subCategories: _courseMetaData?.sub_categories,
        expertiseLevel: _courseMetaData?.expertise_level,
        expectedCompletion: _courseMetaData?.expected_completion
      })
    );
  }

  return;
}
