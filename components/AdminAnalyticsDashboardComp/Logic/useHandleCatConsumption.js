import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleCatConsumption(isCategory = false) {
  const courseType = useRecoilValue(CourseTypeAtom);
  const { catSubCat } = useHandleCatSubCat();

  const [subCatData, setSubCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!catSubCat?.subCat?.length) return;
    const _lspId = sessionStorage.getItem('lsp_id');

    isCategory ? loadAndSetCatData() : loadAndSetSubCatData();

    async function loadAndSetCatData() {
      setIsLoading(true);
      const queryVariables = {
        lsp_id: _lspId,
        course_type: courseType,
        categories: catSubCat?.cat?.map((s) => s?.Name)
      };
      const myCourseStatsRes = await loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
        input: queryVariables
      });
      let zicopsCourseStats = {};
      if (_lspId !== COMMON_LSPS.zicops) {
        queryVariables.lsp_id = COMMON_LSPS.zicops;
        const zicopsCourseStatsRes = await loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
          input: queryVariables
        });

        zicopsCourseStats = zicopsCourseStatsRes?.getBasicCourseStats?.categories || [];
      }

      const subCategoryData = myCourseStatsRes?.getBasicCourseStats?.categories?.map((data) => {
        const cat = catSubCat?.subCat?.find((s) => s?.Name === data?.name);

        const zicopsCatData = zicopsCourseStats?.find(
          (zicopsCat) => zicopsCat?.name === data?.name
        );

        return {
          ...data,
          count: zicopsCatData?.count + data?.count,
          zicopsCourseCount: zicopsCatData?.count,
          myCourseCount: data?.count,
          cat: cat,
          subCatCount:
            catSubCat?.allSubCat?.filter((subCat) => subCat?.CatId === cat?.id)?.length || 0
        };
      });

      setSubCatData(subCategoryData);
      setIsLoading(false);
    }

    async function loadAndSetSubCatData() {
      setIsLoading(true);
      const queryVariables = {
        lsp_id: _lspId,
        course_type: courseType,
        sub_categories: catSubCat?.subCat?.map((s) => s?.Name)
      };
      const myCourseStatsRes = await loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
        input: queryVariables
      });
      let zicopsCourseStats = {};
      if (_lspId !== COMMON_LSPS.zicops) {
        queryVariables.lsp_id = COMMON_LSPS.zicops;
        const zicopsCourseStatsRes = await loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
          input: queryVariables
        });

        zicopsCourseStats = zicopsCourseStatsRes?.getBasicCourseStats?.sub_categories || [];
      }

      const subCategoryData = myCourseStatsRes?.getBasicCourseStats?.sub_categories?.map((data) => {
        const subCat = catSubCat?.subCat?.find((s) => s?.Name === data?.name);
        const cat = catSubCat?.subCatGrp?.[subCat?.CatId];

        const zicopsCatData = zicopsCourseStats?.find(
          (zicopsCat) => zicopsCat?.name === data?.name
        );

        return {
          ...data,
          ...subCat,
          count: zicopsCatData?.count + data?.count,
          zicopsCourseCount: zicopsCatData?.count,
          myCourseCount: data?.count,
          cat: cat?.cat,
          subCatCount:
            catSubCat?.allSubCat?.filter((subCat) => subCat?.CatId === cat?.cat?.id)?.length || 0
        };
      });

      setSubCatData(subCategoryData);
      setIsLoading(false);
    }
  }, [courseType, catSubCat?.subCat?.length, isCategory]);

  return { subCatData, isLoading };
}
