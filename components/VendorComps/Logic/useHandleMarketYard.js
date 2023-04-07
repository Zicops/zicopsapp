import {
  GET_ORDER_SERVICES,
  GET_SPEAKERS,
  GET_VENDOR_SERVICES,
  userQueryClient,
  GET_PAGINATED_VENDORS,
  GET_PAGINATED_VENDOR_ORDERS,
  GET_ORDERS_ORDERID
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
import { VENDOR_ORDER_STATUS } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import { AllServicesAtom, OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
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
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
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
    const orderList = await loadQueryDataAsync(
      GET_PAGINATED_VENDOR_ORDERS,
      { lspId: lspId, pageSize: 28 },
      {},
      userQueryClient
    );
    const _sortedData = sortArrByKeyInOrder(
      orderList?.getAllOrders?.orders || [],
      'updated_at',
      false
    );
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setOrderDetails(_sortedData);
    setLoading(false);
  }

  async function getOrderServices(orderId) {
    setLoading(true);
    const servicesData = await loadQueryDataAsync(
      GET_ORDER_SERVICES,
      { order_id: orderId },
      {},
      userQueryClient
    );
    const _serviceData = [];
    for (let i = 0; i < servicesData?.getOrderServices?.length; i++) {
      const services = servicesData?.getOrderServices[i];
      const newServiceData = {
        ...services,
        serviceId: services?.service_id,
        serviceType: services?.service_type
      };
      _serviceData.push(newServiceData);
    }

    setAllServicesData(_serviceData);
    setLoading(false);
  }

  async function getOrders(orderId) {
    setLoading(true);
    const orders = await loadQueryDataAsync(
      GET_ORDERS_ORDERID,
      { orderId: orderId },
      {},
      userQueryClient
    );
    setOrderData(orders?.getOrders[0]);
    setLoading(false);
  }

  async function addUpdateOrder(vendorId, orderId) {
    const lspId = sessionStorage?.getItem('lsp_id');
    const sendData = {
      vendorId: vendorId,
      lspId: lspId,
      total: orderData?.total,
      tax: orderData?.tax,
      grandTotal: orderData?.grossTotal,
      status: VENDOR_ORDER_STATUS.added
    };
    let isError = false;
    if (orderId) {
      sendData.orderId = orderId;
      await updateOrder({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Order Error' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'Order Updated' });
      return;
    }

    const res = await addOrder({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Order Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'Order Created' });
    return res?.data?.addOrder;
    // }
  }

  async function addUpdateOrderServices(_orderId) {
    const orderArray = [];
    if (servicesData?.sme?.length) {
      orderArray.push(...(servicesData?.sme || []));
    }
    if (servicesData?.crt?.length) {
      orderArray.push(...(servicesData?.crt || []));
    }
    if (servicesData?.cd?.length) {
      orderArray.push(...(servicesData?.cd || []));
    }
    if (servicesData?.speakers?.length) {
      orderArray.push(...(servicesData?.speakers || []));
    }

    const serviceData = [];
    for (let i = 0; i < orderArray?.length; i++) {
      const _orderArray = orderArray[i];
      const sendData = {
        orderId: _orderId,
        serviceType: _orderArray?.serviceType || '',
        description: _orderArray?.description || '',
        unit: _orderArray?.unit || 0,
        currency: orderData?.currency || _orderArray?.currency || '',
        rate: +_orderArray?.rate || 0,
        quantity: _orderArray?.quantity || 0,
        total: _orderArray?.total || 0,
        status: VENDOR_ORDER_STATUS.added
      };
      let isError = false;

      if (_orderArray?.serviceId) {
        sendData.serviceId = _orderArray?.serviceId;
        await updateServices({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Update Services Error' });
        });
        if (isError) return;
        setToastMsg({ type: 'success', message: 'Services Updated' });
        serviceData.push(res?.data?.addOrderServies);
        continue;
      }

      const res = await addServices({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add Services Error' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'Services Created' });
      serviceData.push(res?.data?.addOrderServies);
    }
    return serviceData;
  }

  return {
    getLspVendors,
    vendorDetails,
    addUpdateOrder,
    addUpdateOrderServices,
    getAllOrders,
    getOrderServices,
    orderDetails,
    servicesDetails,
    getLspSpeakers,
    speakerDetails,
    getVendorServices,
    services,
    getOrders
  };
}
