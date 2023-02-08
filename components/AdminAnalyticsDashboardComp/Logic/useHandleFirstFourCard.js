import { userClient } from '@/api/UserMutations';
import { GET_COURSE_CONSUMPTION_STATS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import { getAllCourseCountInLsp } from './adminAnalyticsDashboardComp.helper';

export default function useHandleFirstFourCard() {
  const { catSubCat } = useHandleCatSubCat();

  const [categoryCard, setCategoryCard] = useState({
    id: 1,
    title: 'Categories',
    image: '/images/svg/categories.svg',
    count: null,
    description: 'Categories'
  });
  const [subCategoryCard, setSubCategoryCard] = useState({
    id: 2,
    title: 'Sub-categories',
    image: '/images/svg/workspaces.svg',
    count: null,
    description: 'Sub-categories'
  });
  const [myCourseCard, setMyCourseCard] = useState({
    id: 3,
    title: 'My Courses',
    image: '/images/svg/local_library.svg',
    count: null,
    description: 'X assigned courses'
  });
  const [zicopsCard, setZicopsCard] = useState({
    id: 4,
    title: 'Zicops Courses',
    image: '/images/svg/Logo.svg',
    count: null,
    description: 'X assigned courses'
  });

  // cat sub cat count
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    setCategoryCard((previousData) => ({ ...previousData, count: catSubCat?.cat?.length }));
    setSubCategoryCard((previousData) => ({
      ...previousData,
      count: catSubCat?.subCat?.filter((subCat) => subCat?.LspId === _lspId)?.length
    }));
  }, [catSubCat?.cat?.length, catSubCat?.subCat?.length]);

  // courses count
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');
    // My Courses Count

    loadCourseCardData();

    async function loadCourseCardData() {
      const myCourseDataRes = loadCourseStats(_lspId);
      const zicopsCourseDataRes = loadCourseStats(COMMON_LSPS.zicops);

      const myCourseData = await myCourseDataRes;
      const zicopsCourseData = await zicopsCourseDataRes;
      setMyCourseCard({ ...myCourseCard, count: myCourseData?.totalMyCourses });
      setZicopsCard({ ...zicopsCard, count: zicopsCourseData?.totalMyCourses });
    }

    async function loadCourseStats(lspId) {
      let totalMyCourses = 0;
      let totalAssignedCourses = 0;
      if (!lspId) return { totalAssignedCourses, totalMyCourses };

      const totalCourseCountRes = getAllCourseCountInLsp(lspId);
      const myCourseConsumptionStats = loadQueryDataAsync(
        GET_COURSE_CONSUMPTION_STATS,
        { lsp_id: _lspId, pageCursor: '', direction: '', pageSize: 100 },
        {},
        userClient
      );

      return { totalAssignedCourses, totalMyCourses: await totalCourseCountRes };
    }
  }, []);

  return [categoryCard, subCategoryCard, myCourseCard, zicopsCard];
}
