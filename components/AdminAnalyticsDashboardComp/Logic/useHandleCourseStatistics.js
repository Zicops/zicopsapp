import { GET_COURSE } from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import { GET_COURSE_CONSUMPTION_STATS } from '@/api/UserQueries';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { snakeCaseToTitleCase } from '@/helper/common.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { useEffect, useState } from 'react';

export default function useHandleCourseStatistics() {
  const [mostAssigned, setMostAssigned] = useState({
    id: 1,
    title: 'Most added/assigned',
    icon: '/images/svg/trending_up.svg',
    courseName: null,
    learnerCount: null,
    type: null
  });
  const [leastAssigned, setLeastAssigned] = useState({
    id: 2,
    title: 'Least added/assigned',
    icon: '/images/svg/trending_down.svg',
    courseName: null,
    learnerCount: null,
    type: null
  });
  const [isLoading, setIsLoading] = useState(false);

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

      const allCourseIds = data?.map((d) => d?.CourseId);
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
          duration: d?.Duration,

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

      const _sortedData = sortArrByKeyInOrder(_tableData, 'totalLearners', false);
      const _mostAssigned = _sortedData[0];
      const _leastAssigned = _sortedData[_sortedData?.length - 1];
      setMostAssigned({
        ...mostAssigned,
        courseName: _mostAssigned?.name,
        learnerCount: _mostAssigned?.totalLearners,
        type: snakeCaseToTitleCase(_mostAssigned?.type)
      });
      setLeastAssigned({
        ...leastAssigned,
        courseName: _leastAssigned?.name,
        learnerCount: _leastAssigned?.totalLearners,
        type: snakeCaseToTitleCase(_leastAssigned?.type)
      });
      setIsLoading(false);
    }
  }, []);

  return { mostAssigned, leastAssigned, isLoading, setIsLoading };
}
