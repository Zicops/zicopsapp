import {
  GET_ALL_ORDERS,
  GET_ORDER_SERVICES,
  GET_VENDORS_BY_LSP,
  userQueryClient
} from '@/api/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { useState } from 'react';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import {
  ADD_ORDER,
  ADD_ORDER_SERVICES,
  UPDATE_ORDER,
  UPDATE_ORDER_SERVICES,
  userClient
} from '@/api/UserMutations';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import { OrderAtom, SevicesAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
export default function useHandleMarketYard() {
  const [addOrder] = useMutation(ADD_ORDER, { client: userClient });
  const [updateOrder] = useMutation(UPDATE_ORDER, { client: userClient });
  const [addServices] = useMutation(ADD_ORDER_SERVICES, { client: userClient });
  const [updateServices] = useMutation(UPDATE_ORDER_SERVICES, { client: userClient });
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [servicesData, setServicesData] = useRecoilState(SevicesAtom);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [servicesDetails, setServicesDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getLspVendors(lspId, isDataReturn = false) {
    setLoading(true);
    const vendorList = await loadAndCacheDataAsync(
      GET_VENDORS_BY_LSP,
      { lsp_id: lspId },
      {},
      userQueryClient
    );
    // filters: { status: 'Active', service: service }
    const _sortedData = sortArrByKeyInOrder(vendorList?.getVendors || [], 'updated_at', false);
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setVendorDetails(_sortedData);
    setLoading(false);
  }

  async function getAllOrders(lspId, isDataReturn = false) {
    setLoading(true);
    const orderList = await loadAndCacheDataAsync(
      GET_ALL_ORDERS,
      { lsp_id: lspId },
      {},
      userQueryClient
    );
    const _sortedData = sortArrByKeyInOrder(orderList?.getAllOrders || [], 'updated_at', false);
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setOrderDetails(_sortedData);
    setLoading(false);
  }

  async function getOrderServices(orderId, isDataReturn = false) {
    setLoading(true);
    const servicesData = await loadAndCacheDataAsync(
      GET_ORDER_SERVICES,
      { order_id: orderId },
      {},
      userQueryClient
    );
    const _sortedData = sortArrByKeyInOrder(
      servicesData?.getOrderServices || [],
      'updated_at',
      false
    );
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setServicesDetails(_sortedData);
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

  async function addUpdateServices() {
    const sendData = {
      service_id: servicesData?.service_id || '',
      order_id: servicesData?.order_id || '',
      service_type: servicesData?.service_type || '',
      description: servicesData?.description || '',
      unit: servicesData?.unit || 0,
      currency: servicesData?.currency || '',
      rate: servicesData?.rate || 0,
      quantity: servicesData?.quantity || 0,
      total: servicesData?.total || 0,
      Status: VENDOR_MASTER_STATUS.active
    };
    let isError = false;
    if (servicesData?.service_id) {
      sendData.service_id = smeData?.service_id;
      await updateServices({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update SERVICES Error' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'SERVICES Updated' });
      return;
    }
    // if (smeData?.serviceDescription && smeData?.expertises?.length && smeData?.languages?.length) {
    const res = await addServices({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add SERVICES Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'SERVICES Created' });
    return res;
    // }
  }

  return {
    getLspVendors,
    vendorDetails,
    addUpdateOrder,
    addUpdateServices,
    getAllOrders,
    getOrderServices,
    orderDetails,
    servicesDetails
  };
}
