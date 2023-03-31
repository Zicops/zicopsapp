import {
  GET_ALL_ORDERS,
  GET_ORDER_SERVICES,
  GET_SPEAKERS,
  GET_VENDORS_BY_LSP,
  GET_VENDOR_SERVICES,
  userQueryClient,
  GET_PAGINATED_VENDORS
} from '@/api/UserQueries';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
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
import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
export default function useHandleMarketYard() {
  const [addOrder] = useMutation(ADD_ORDER, { client: userClient });
  const [updateOrder] = useMutation(UPDATE_ORDER, { client: userClient });
  const [addServices] = useMutation(ADD_ORDER_SERVICES, { client: userClient });
  const [updateServices] = useMutation(UPDATE_ORDER_SERVICES, { client: userClient });
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [servicesDetails, setServicesDetails] = useState([]);
  const [speakerDetails, setSpeakerDetails] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  async function getLspVendors(lspId, filters, isDataReturn = false) {
    setLoading(true);
    const vendorList = await loadQueryDataAsync(
      // GET_VENDORS_BY_LSP,
      GET_PAGINATED_VENDORS,
      { lsp_id: lspId, filters: filters, pageSize: 28 },
      {},
      userQueryClient
    );
    // filters: { status: 'Active', service: service }
    const _sortedData = sortArrByKeyInOrder(
      vendorList?.getPaginatedVendors?.vendors || [],
      'updated_at',
      false
    );
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setVendorDetails(_sortedData);
    setLoading(false);
  }

  async function getLspSpeakers(lspId, service, name, isDataReturn = false) {
    setLoading(true);
    const speakerList = await loadQueryDataAsync(
      GET_SPEAKERS,
      { lspId: lspId, service: service, name: name },
      {},
      userQueryClient
    );
    const _sortedData = sortArrByKeyInOrder(speakerList?.getSpeakers || [], 'updated_at', false);
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }

    let newSpeakerArray = [];
    for (let i = 0; i < _sortedData?.length; i++) {
      newSpeakerArray.push({
        ..._sortedData[i],
        vendorId: _sortedData[i]?.vendor_id,
        name: _sortedData[i]?.first_name + ' ' + _sortedData[i]?.last_name
      });
    }

    setSpeakerDetails(newSpeakerArray);
    setLoading(false);
  }

  async function getVendorServices(vendorId) {
    setLoading(true);
    const services = await loadQueryDataAsync(
      GET_VENDOR_SERVICES,
      { vendorId: vendorId },
      {},
      userQueryClient
    );
    setServices(services?.getVendorServices);
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
    const lspId = sessionStorage?.getItem('lsp_id');
    const sendData = {
      orderId: orderData?.orderId,
      vendorId: vendorId,
      lspId: lspId,
      total: orderData?.total,
      tax: orderData?.tax,
      grandTotal: orderData?.grossTotal,
      status: 'Added'
    };
    let isError = false;
    if (orderData?.orderId) {
      sendData.orderId = smeData?.orderId;
      await updateOrder({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'UPDATE ORDER ERROR' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'ORDER UPDATED' });
      return;
    }

    const res = await addOrder({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add ORDER ERROR' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'ORDER CREATED' });
    return res?.data?.addOrder;
    // }
  }

  async function addUpdateServices() {
    const orderArray = [];
    if (servicesData?.sme?.length) {
      orderArray.push(...servicesData?.sme);
    }
    if (servicesData?.crt?.length) {
      orderArray.push(...servicesData?.crt);
    }
    if (servicesData?.cd?.length) {
      orderArray.push(...servicesData?.cd);
    }
    if (servicesData?.speakers?.length) {
      orderArray.push(...servicesData?.speakers);
    }

    const serviceData = [];
    for (let i = 0; i < orderArray?.length; i++) {
      const sendData = {
        serviceId: orderArray[i]?.serviceId || '',
        orderId: orderArray[i]?.orderId || '',
        serviceType: orderArray[i]?.serviceType || '',
        description: orderArray[i]?.description || '',
        unit: orderArray[i]?.unit || 0,
        currency: orderData?.currency || '',
        rate: +orderArray[i]?.rate || 0,
        quantity: orderArray[i]?.quantity || 0,
        total: orderArray[i]?.total || 0,
        status: 'Added'
      };
      let isError = false;

      if (orderArray[i]?.serviceId) {
        sendData.serviceId = orderArray[i]?.serviceId;
        await updateServices({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'UPDATE SERVICES ERROR' });
        });
        if (isError) return;
        setToastMsg({ type: 'success', message: 'SERVICES Updated' });
        serviceData.push(res?.data?.addOrderServies);
        continue;
      }

      const res = await addServices({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'ADD SERVICES ERROR' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'SERVICES CREATED' });
      serviceData.push(res?.data?.addOrderServies);
    }
    return serviceData;
  }

  return {
    getLspVendors,
    vendorDetails,
    addUpdateOrder,
    addUpdateServices,
    getAllOrders,
    getOrderServices,
    orderDetails,
    servicesDetails,
    getLspSpeakers,
    speakerDetails,
    getVendorServices,
    services
  };
}
