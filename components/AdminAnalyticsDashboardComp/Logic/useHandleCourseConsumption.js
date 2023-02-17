import { GET_COURSE } from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import { GET_COURSE_CONSUMPTION_STATS } from '@/api/UserQueries';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { displayMinToHMS } from '@/helper/utils.helper';
import { useEffect, useState } from 'react';

export default function useHandleCourseConsumption() {
  const [tableData, setTableData] = useState(null);
  const [filters, setFilters] = useState({ category: null, subCategory: null });
  const [isLoading, setIsLoading] = useState(true);

  // courses count
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadCourseStats();

    async function loadCourseStats() {
      setIsLoading(true);
      const myCourseConsumptionStats = loadQueryDataAsync(
        GET_COURSE_CONSUMPTION_STATS,
        { lsp_id: _lspId, pageCursor: '', direction: '', pageSize: 100 },
        {},
        userClient
      );

      const data = (await myCourseConsumptionStats)?.getCourseConsumptionStats?.stats || [];

      const allCourseIds = data?.map((d) => d?.CourseId) || [];
      const allCourseData = await loadAndCacheDataAsync(GET_COURSE, { course_id: allCourseIds });

      const _tableData = data?.map((d) => {
        const courseData = allCourseData?.getCourse?.find((c) => c?.id === d?.CourseId);

        return {
          ...courseData,
          lspId: d?.LspId,
          courseId: d?.CourseId,

          category: d?.Category,
          subCategory: d?.SubCategory,

          ownedBy: d?.Owner,
          duration: displayMinToHMS(d?.Duration / 60),

          totalLearners: d?.TotalLearners,
          activeLearners: d?.ActiveLearners,
          completedBy: d?.CompletedLearners,
          expectedCompletionTime: d?.ExpectedCompletionTime,
          averageCompletionTime: d?.AverageCompletionTime,
          averageCompliance: d?.AverageComplianceScore,

          createdAt: d?.CreatedAt,
          updatedAt: d?.UpdatedAt,
          createdBy: d?.CreatedBy,
          updatedBy: d?.UpdatedBy,

          courseName: courseData?.name,
          publishedOn: new Date(+courseData?.publish_date * 1000).toLocaleDateString()
        };
      });
      setTableData(_tableData || []);
      setIsLoading(false);
    }
  }, []);

  const filteredData = tableData?.filter((data) => {
    let isFiltered = true;
    if (filters?.category) isFiltered = data?.category?.includes(filters?.category);
    if (filters?.subCategory) isFiltered = data?.subCategory?.includes(filters?.subCategory);

    return isFiltered;
  });

  return { tableData: filteredData, filters, setFilters, isLoading, setIsLoading };
}
