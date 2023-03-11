import { GET_VENDORS_BY_LSP, userQueryClient } from '@/api/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { useState } from 'react';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { ADD_ORDER, UPDATE_ORDER, userClient } from '@/api/UserMutations';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import { OrderAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
export default function useHandleMarketYard() {
  const [addOrder] = useMutation(ADD_ORDER, { client: userClient });
  const [updateOrder] = useMutation(UPDATE_ORDER, { client: userClient });
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getLspVendors(lspId, isDataReturn = false) {
    setLoading(true);
    const vendorList = await loadAndCacheDataAsync(
      GET_VENDORS_BY_LSP,
      { lsp_id: lspId },
      {},
      userQueryClient
    );
    const _sortedData = sortArrByKeyInOrder(vendorList?.getVendors || [], 'updated_at', false);
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setVendorDetails(_sortedData);
    setLoading(false);
  }
  async function addUpdateOrder() {
    const sendData = {
      order_id: orderData?.order_id,
      vendor_id: orderData?.vendor_id,
      lsp_id: orderData?.lsp_id,
      total: orderData?.total,
      tax: orderData?.tax,
      grand_total: orderData?.grand_total,
      Status: VENDOR_MASTER_STATUS.active
    };
    let isError = false;
    if (orderData?.order_id) {
      sendData.order_id = smeData?.order_id;
      await updateOrder({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update ORDER Error' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'ORDER Updated' });
      return;
    }
    // if (smeData?.serviceDescription && smeData?.expertises?.length && smeData?.languages?.length) {
    const res = await addOrder({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add ORDER Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'ORDER Created' });
    return res;
    // }
  }
  return { getLspVendors, vendorDetails, addUpdateOrder };
}
