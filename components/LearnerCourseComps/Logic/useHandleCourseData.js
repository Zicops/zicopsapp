import { GET_COURSE, GET_COURSE_MODULES } from '@/api/Queries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { CourseMetaDataAtom, getCourseMetaDataObj } from '../atoms/learnerCourseComps.atom';

export default function useHandleCourseData() {
  const [courseMeta, setCourseMeta] = useRecoilState(CourseMetaDataAtom);
  const router = useRouter();
  const courseId = router.query.courseId || null;

  loadCourseMetaData();

  async function loadCourseMetaData() {
    if (!courseId) return;
    if (courseId === courseMeta?.id) return;

    const courseMetaRes = loadAndCacheDataAsync(GET_COURSE, { course_id: [courseId] });

    const _courseMetaData = structuredClone((await courseMetaRes)?.getCourse?.[0] || {});
    setCourseMeta(
      getCourseMetaDataObj({
        ..._courseMetaData,
        subCategory: _courseMetaData?.sub_category,
        subCategories: _courseMetaData?.sub_categories,
        expertiseLevel: _courseMetaData?.expertise_level,
        expectedCompletion: _courseMetaData?.expected_completion,
      }),
    );
  }

  async function loadCourseModuleData() {
    if (!courseId) return;
    if (courseId === courseMeta?.id) return;

    const moduleRes = loadAndCacheDataAsync(GET_COURSE_MODULES, { course_id: [courseId] });
  }

  return;
}
