import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleCatConsumption(isCategory = false) {
  const courseType = useRecoilValue(CourseTypeAtom);
  const { catSubCat } = useHandleCatSubCat();

  const [subCatData, setSubCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const courseStats = loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
        input: queryVariables
      });

      const categoryData = (await courseStats)?.getBasicCourseStats?.categories?.map((data) => {
        const cat = catSubCat?.subCat?.find((s) => s?.Name === data?.name);
        return { ...data, ...cat };
      });

      setSubCatData(categoryData);
      setIsLoading(false);
    }

    async function loadAndSetSubCatData() {
      setIsLoading(true);
      const queryVariables = {
        lsp_id: _lspId,
        course_type: courseType,
        sub_categories: catSubCat?.subCat?.map((s) => s?.Name)
      };
      const courseStats = loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
        input: queryVariables
      });

      const subCategoryData = (await courseStats)?.getBasicCourseStats?.sub_categories?.map(
        (data) => {
          const subCat = catSubCat?.subCat?.find((s) => s?.Name === data?.name);
          const cat = catSubCat?.subCatGrp?.[subCat?.CatId];
          return { ...data, ...subCat, cat: cat?.cat };
        }
      );

      setSubCatData(subCategoryData);
      setIsLoading(false);
    }
  }, [courseType, catSubCat?.subCat?.length, isCategory]);

  return { subCatData, isLoading };
}
