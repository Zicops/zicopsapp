import { GET_COURSE } from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import {
  GET_COURSE_CONSUMPTION_STATS,
  GET_MOST_LEAST_ASSGINED_COURSES,
  userQueryClient,
} from '@/api/UserQueries';
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
    type: null,
  });
  const [leastAssigned, setLeastAssigned] = useState({
    id: 2,
    title: 'Least added/assigned',
    icon: '/images/svg/trending_down.svg',
    courseName: null,
    learnerCount: null,
    type: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // courses count
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    // loadCourseStats();
    loadMostAndLeastAssignedCourse();

    // async function loadCourseStats() {
    //   setIsLoading(true);
    //   const myCourseConsumptionStats = loadQueryDataAsync(
    //     GET_COURSE_CONSUMPTION_STATS,
    //     { lsp_id: _lspId, pageCursor: '', direction: '', pageSize: 100 },
    //     {},
    //     userClient,
    //   );

    //   const data = (await myCourseConsumptionStats)?.getCourseConsumptionStats?.stats || [];

    //   const allCourseIds = data?.map((d) => d?.CourseId);
    //   const allCourseData = await loadAndCacheDataAsync(GET_COURSE, { course_id: allCourseIds });

    //   const _tableData = data?.map((d) => {
    //     const courseData = allCourseData?.getCourse?.find((c) => c?.id === d?.CourseId);

    //     return {
    //       ...courseData,
    //       lspId: d?.LspId,
    //       courseId: d?.CourseId,

    //       category: d?.Category,
    //       subCategory: d?.SubCategory,

    //       ownedBy: d?.Owner,
    //       duration: d?.Duration,

    //       totalLearners: d?.TotalLearners,
    //       activeLearners: d?.ActiveLearners,
    //       completedBy: d?.CompletedLearners,
    //       expectedCompletionTime: d?.ExpectedCompletionTime,
    //       averageCompletionTime: d?.AverageCompletionTime,
    //       averageCompliance: d?.AverageComplianceScore,

    //       createdAt: d?.CreatedAt,
    //       updatedAt: d?.UpdatedAt,
    //       createdBy: d?.CreatedBy,
    //       updatedBy: d?.UpdatedBy,

    //       courseName: courseData?.name,
    //       publishedOn: new Date(+courseData?.publish_date * 1000).toLocaleDateString(),
    //     };
    //   });

    //   const _sortedData = sortArrByKeyInOrder(_tableData, 'totalLearners', false);
    //   const _mostAssigned = _sortedData[0];
    //   const _leastAssigned = _sortedData[_sortedData?.length - 1];
    //   setMostAssigned({
    //     ...mostAssigned,
    //     courseName: _mostAssigned?.name,
    //     learnerCount: _mostAssigned?.totalLearners,
    //     type: snakeCaseToTitleCase(_mostAssigned?.type),
    //   });
    //   // setLeastAssigned({
    //   //   ...leastAssigned,
    //   //   courseName: _leastAssigned?.name,
    //   //   learnerCount: _leastAssigned?.totalLearners,
    //   //   type: snakeCaseToTitleCase(_leastAssigned?.type),
    //   // });
    //   setIsLoading(false);
    // }

    async function loadMostAndLeastAssignedCourse() {
      const getLeastAssignedCourse = loadQueryDataAsync(
        GET_MOST_LEAST_ASSGINED_COURSES,
        { lsp_id: _lspId, input: 'least' },
        {},
        userQueryClient,
      );

      getLeastAssignedCourse.then((resp) => {
        const _courseDetails = loadAndCacheDataAsync(GET_COURSE, {
          course_id: [resp?.getMostLeastAssignedCourse?.CourseId],
        });

        _courseDetails.then((res) => {
          setLeastAssigned((prev) => ({
            ...prev,
            courseName: res?.getCourse?.[0]?.name,
            type: snakeCaseToTitleCase(res?.getCourse?.[0]?.type),
          }));
        });

        setLeastAssigned((prev) => ({
          ...prev,
          learnerCount: resp?.getMostLeastAssignedCourse?.ActiveLearners,
        }));
      });

      const getMostAssignedCourse = loadQueryDataAsync(
        GET_MOST_LEAST_ASSGINED_COURSES,
        { lsp_id: _lspId, input: 'most' },
        {},
        userQueryClient,
      );

      getMostAssignedCourse.then((resp) => {
        const _courseDetails = loadAndCacheDataAsync(GET_COURSE, {
          course_id: [resp?.getMostLeastAssignedCourse?.CourseId],
        });

        _courseDetails.then((res) => {
          setMostAssigned((prev) => ({
            ...prev,
            courseName: res?.getCourse?.[0]?.name,
            type: snakeCaseToTitleCase(res?.getCourse?.[0]?.type),
          }));
        });

        setMostAssigned((prev) => ({
          ...prev,
          learnerCount: resp?.getMostLeastAssignedCourse?.ActiveLearners,
        }));
      });
    }
  }, []);

  return { mostAssigned, leastAssigned, isLoading, setIsLoading };
}
