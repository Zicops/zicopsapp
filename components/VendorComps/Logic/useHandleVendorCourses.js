import { GET_MY_COURSES } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_STATUS } from '@/helper/constants.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilValue } from 'recoil';

const time = getUnixFromDate();

export default function useHandleVendorCourses() {
  const vendorData = useRecoilValue(VendorStateAtom);

  async function getVendorCourses(status = COURSE_STATUS.publish) {
    const lspId = sessionStorage?.getItem('lsp_id');

    const courseInfo = await loadQueryDataAsync(GET_MY_COURSES, {
      publish_time: time,
      pageSize: 30,
      pageCursor: '',
      status,
      filters: { LspId: lspId, Owner: vendorData?.name }
    });

    return courseInfo?.latestCourses?.courses || [];
  }

  return { getVendorCourses };
}
