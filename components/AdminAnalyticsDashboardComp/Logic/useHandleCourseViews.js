import { userClient } from '@/api/UserMutations';
import { GET_COURSE_VIEWS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getUnixFromDate, months } from '@/helper/utils.helper';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function useHandleCourseViews() {
  const now = new Date();
  const [courseViews, setCourseViews] = useState([]);
  const [month, setMonth] = useState(months[now?.getMonth()]);

  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    const startOfMonth = moment().startOf(month).format('YYYY-MM-DD');
    const endOfMonth = moment().endOf(month).format('YYYY-MM-DD');

    loadAndSetData();

    async function loadAndSetData() {
      const queryVariables = {
        lsp_id: [_lspId],
        startTime: getUnixFromDate(startOfMonth),
        endTime: getUnixFromDate(endOfMonth)
      };

      const courseStats = loadQueryDataAsync(GET_COURSE_VIEWS, queryVariables, {}, userClient);

      console.info(await courseStats);
      //   const subCategoryData = (await courseStats)?.getBasicCourseStats?.sub_categories?.map(
      //     (data) => {
      //       const subCat = catSubCat?.subCat?.find((s) => s?.Name === data?.name);
      //       const cat = catSubCat?.subCatGrp?.[subCat?.CatId];
      //       return { ...data, ...subCat, cat: cat?.cat };
      //     }
      //   );
    }
  }, []);

  return {};
}
