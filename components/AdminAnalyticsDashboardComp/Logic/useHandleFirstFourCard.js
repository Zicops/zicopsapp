import { COMMON_LSPS } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getAllCourseCountInLsp } from './adminAnalyticsDashboardComp.helper';

export default function useHandleFirstFourCard() {
  const { catSubCat } = useHandleCatSubCat();
  const courseType = useRecoilValue(CourseTypeAtom);

  const [categoryCard, setCategoryCard] = useState({
    id: 1,
    title: 'Categories',
    image: '/images/svg/categories.svg',
    count: null,
    caption: null
  });
  const [subCategoryCard, setSubCategoryCard] = useState({
    id: 2,
    title: 'Sub-categories',
    image: '/images/svg/workspaces.svg',
    count: null,
    caption: null
  });
  const [myCourseCard, setMyCourseCard] = useState({
    id: 3,
    title: 'My Courses',
    image: '/images/svg/local_library.svg',
    count: null,
    caption: 'X assigned courses'
  });
  const [zicopsCard, setZicopsCard] = useState({
    id: 4,
    title: 'Zicops Courses',
    image: '/images/svg/Logo.svg',
    count: null,
    caption: 'X assigned courses'
  });

  // cat sub cat count
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');
    if (!catSubCat?.cat?.length && !catSubCat?.subCat?.length) return;

    const allCatCount = catSubCat?.cat?.length || 0;
    const myLspCatCount = catSubCat?.cat?.filter((c) => c?.LspId === _lspId)?.length || 0;

    const allSubCatCount = catSubCat?.subCat?.length || 0;
    const myLspSubCatCount = catSubCat?.subCat?.filter((sc) => sc?.LspId === _lspId)?.length || 0;
    setCategoryCard((previousData) => ({
      ...previousData,
      count: allCatCount,
      caption: (
        <>
          <p>Zicops Categories:{allCatCount - myLspCatCount}</p>
          <p>My Categories: {myLspCatCount}</p>
        </>
      )
    }));
    setSubCategoryCard((previousData) => ({
      ...previousData,
      count: allSubCatCount,
      caption: (
        <>
          <p>Zicops Sub-Categories: {allSubCatCount - myLspSubCatCount}</p>
          <p>My Sub-Categories: {myLspSubCatCount}</p>
        </>
      )
    }));
  }, [catSubCat?.cat?.length, catSubCat?.subCat?.length]);

  // courses count
  useEffect(() => {
    setMyCourseCard({ ...myCourseCard, count: null });
    setZicopsCard({ ...zicopsCard, count: null });
    const _lspId = sessionStorage.getItem('lsp_id');
    // My Courses Count

    loadCourseCardData();

    async function loadCourseCardData() {
      const myCourseDataRes = loadCourseStats(_lspId);
      const zicopsCourseDataRes = loadCourseStats(COMMON_LSPS.zicops);

      const myCourseData = await myCourseDataRes;
      const zicopsCourseData = await zicopsCourseDataRes;
      setMyCourseCard({ ...myCourseCard, count: myCourseData?.totalMyCourses || 0 });
      setZicopsCard({ ...zicopsCard, count: zicopsCourseData?.totalMyCourses || 0 });
    }

    async function loadCourseStats(lspId) {
      let totalMyCourses = 0;
      let totalAssignedCourses = 0;
      if (!lspId) return { totalAssignedCourses, totalMyCourses };

      const totalCourseCountRes = getAllCourseCountInLsp(lspId, { course_type: courseType });
      // Add API call for getting total assign courses in a particular lsp
      // const myCourseConsumptionStats = loadQueryDataAsync(
      //   GET_COURSE_CONSUMPTION_STATS,
      //   { lsp_id: _lspId, pageCursor: '', direction: '', pageSize: 100 },
      //   {},
      //   userClient
      // );

      return { totalAssignedCourses, totalMyCourses: await totalCourseCountRes };
    }
  }, [courseType]);

  return [categoryCard, subCategoryCard, myCourseCard, zicopsCard];
}
