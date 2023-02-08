import { useEffect, useState } from 'react';
import { getAllCourseCountInLsp } from './adminAnalyticsDashboardComp.helper';

export default function useHandleMultilingualCourses() {
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

    const totalLspCourseCount = getAllCourseCountInLsp(_lspId);

    async function loadAndSetMultilingualData() {
      const hindiCourseCount = getAllCourseCountInLsp(_lspId, null, [hindiCourses.language]);
      const englishCourseCount = getAllCourseCountInLsp(_lspId, null, [englishCourses.language]);

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
  }, []);

  return [hindiCourses, englishCourses];
}
