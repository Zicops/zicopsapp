import {
  CREATE_COMMERCIALS_DATA,
  UPDATE_COMMERCIALS_DATA,
  viltMutationClient
} from '@/api/ViltMutations';
import { CLASSROOM_MASTER_STATUS, COMMERCIAL_PRICEING_TYPE } from '@/constants/course.constants';
import { mutateData } from '@/helper/api.helper';
import { sanitizeFormData } from '@/helper/common.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { CommercialsAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilCallback, useRecoilState } from 'recoil';

export default function useHandleCommercial() {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const [commercialsData, setCommercialsData] = useRecoilState(CommercialsAtom);
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  let priceType;
  if (commercialsData?.is_decided) {
    priceType = COMMERCIAL_PRICEING_TYPE?.tbd;
  }
  if (commercialsData?.is_paid_traning) {
    priceType = COMMERCIAL_PRICEING_TYPE?.paid;
  }
  if (commercialsData?.is_free_traning) {
    priceType = COMMERCIAL_PRICEING_TYPE?.free;
  }

  async function addUpdateCommercial() {
    const _commercilaData = sanitizeFormData({
      course_id: courseMetaData?.id,
      pricing_type: priceType,
      price_per_seat: +commercialsData?.price_per_seat,
      currency: commercialsData?.currency,
      tax_percentage: +commercialsData?.tax_percentage,
      max_registrations: +commercialsData?.max_registrations,
      registration_end_date: getUnixFromDate(commercialsData?.registration_end_date) || '',
      booking_start_date: getUnixFromDate(commercialsData?.booking_start_date) || '',
      booking_end_date: getUnixFromDate(commercialsData?.booking_end_date) || '',
      status: CLASSROOM_MASTER_STATUS?.save
    });

    if (!!commercialsData?.id) {
      _commercilaData.id = commercialsData?.id;
      const resUpdate = await mutateData(
        UPDATE_COMMERCIALS_DATA,
        { input: _commercilaData },
        {},
        viltMutationClient
      ).catch(() => setToastMessage('Commercial Update Error!'));

      return resUpdate?.updateViltData || null;
    }

    const res = await mutateData(
      CREATE_COMMERCIALS_DATA,
      { input: _commercilaData },
      {},
      viltMutationClient
    ).catch(() => setToastMessage('Commercial Create Error!'));

    setCommercialsData((prev) => ({ ...prev, id: res?.createViltData?.id }));

    return res?.createViltData || null;
  }
  return { addUpdateCommercial };
}
