import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getAllCourseCountInLsp } from './adminAnalyticsDashboardComp.helper';

export default function useHandleMultilingualCourses() {
  const courseType = useRecoilValue(CourseTypeAtom);

  const [hindiCourses, setHindiCourses] = useState({
    language: 'Hindi',
    totalLangCourses: null,
    progressPercent: 0
  });
  const [englishCourses, setEnglishCourses] = useState({
    language: 'English',
    totalLangCourses: null,
    progressPercent: 0
  });

  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadAndSetMultilingualData();

    const totalLspCourseCount = getAllCourseCountInLsp(_lspId, courseType);

    async function loadAndSetMultilingualData() {
      const hindiCourseCount = getAllCourseCountInLsp(_lspId, courseType, null, [
        hindiCourses.language
      ]);
      const englishCourseCount = getAllCourseCountInLsp(_lspId, courseType, null, [
        englishCourses.language
      ]);

      setHindiCourses({
        ...hindiCourses,
        totalLangCourses: await hindiCourseCount,
        progressPercent: getPercent(await hindiCourseCount, await totalLspCourseCount)
      });
      setEnglishCourses({
        ...englishCourses,
        totalLangCourses: await englishCourseCount,
        progressPercent: getPercent(await englishCourseCount, await totalLspCourseCount)
      });
    }

    function getPercent(count = 0, total = 0) {
      if (!count || !total) return 0;

      return Math.ceil((count / total) * 100);
    }
  }, [courseType]);

  return [hindiCourses, englishCourses];
}
