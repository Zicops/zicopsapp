import React, { useEffect, useState } from 'react';
import VendorPopUp from './common/VendorPopUp';
import ReviewAndTaxConfirm from './ReviewAndTaxConfirm';
import {
  AllServicesAtom,
  OrderAtom,
  ServicesAtom,
  VendorServicesListAtom,
  getVendorOrderObject,
  getVendorServicesList,
  getVendorServicesObject,
} from '@/state/atoms/vendor.atoms';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import { useRecoilState, useRecoilValue } from 'recoil';
import useHandleVendor from './Logic/useHandleVendor';
import {
  USER_LSP_ROLE,
  VENDOR_ORDER_STATUS,
  VENDOR_SERVICES_TYPE,
} from '@/helper/constants.helper';
import Loader from '../common/Loader';
import ConfirmPopUp from '../common/ConfirmPopUp';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';

const ViewOrder = ({ orderId = null, viewOrder, setViewOrder, onSuccess = () => {} }) => {
  const [currentComponent, setCurrentComponent] = useState('');
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [isRejectOrder, setRejectOrder] = useState(false);
  const [isConfirmOrder, setConfirmOrder] = useState(false);
  const { getSingleVendorInfo } = useHandleVendor();
  const {
    addUpdateOrder,
    orderDetails,
    getAllOrders,
    setOrderDetails,
    getOrderServices,
    getVendorServices,
    getOrders,
  } = useHandleMarketYard();

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);
  const orderInfo = orderDetails?.filter((data) => data?.id === orderId);
  let sme = false;
  let crt = false;
  let cd = false;
  let smeArr = [];
  let crtArr = [];
  let cdArr = [];

  useEffect(async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    await getAllOrders(lspId);
    await getOrderServices(orderInfo[0]?.id);
    await getSingleVendorInfo(orderInfo[0]?.vendor_id);
    await getVendorServices(orderInfo[0]?.vendor_id);
    await getOrders(orderId);
  }, [orderInfo[0]?.vendor_id, orderInfo[0]?.id, orderId]);

  useEffect(() => {
    if (allServicesData?.length) {
      allServicesData?.map((data) => {
        if (data?.service_type === VENDOR_SERVICES_TYPE?.sme.type) {
          sme = true;
          smeArr?.push({ ...data, isActive: true });
        }
        if (data?.service_type === VENDOR_SERVICES_TYPE?.crt?.type) {
          crt = true;
          crtArr?.push({ ...data, isActive: true });
        }
        if (data?.service_type === VENDOR_SERVICES_TYPE?.cd?.type) {
          cd = true;
          cdArr?.push({ ...data, isActive: true });
        }
      });
      setSelectedServicesForOrder({ ...selectedServicesForOrder, sme: sme, crt: crt, cd: cd });
      setServicesData({ ...servicesData, sme: smeArr, crt: crtArr, cd: cdArr });
    }
  }, [allServicesData]);

  useEffect(() => {
    if (orderData?.status === VENDOR_ORDER_STATUS?.added) {
      setCurrentComponent(0);
    }
    if (orderData?.status === VENDOR_ORDER_STATUS?.confirmed) {
      setCurrentComponent(1);
    }
    if (orderData?.status === VENDOR_ORDER_STATUS?.completed) {
      setCurrentComponent(2);
    }
    if (orderData?.status === VENDOR_ORDER_STATUS?.rejected) {
      setCurrentComponent(2);
    }
  }, [orderData]);

  const confirmOrderHandler = async () => {
    setCurrentComponent(currentComponent + 1);
    const _orderData = structuredClone(orderData);
    if (currentComponent === 0) {
      _orderData.status = VENDOR_ORDER_STATUS?.confirmed;
      await addUpdateOrder(
        orderInfo[0]?.vendor_id,
        orderInfo[0]?.id,
        VENDOR_ORDER_STATUS?.confirmed,
      );
      setConfirmOrder(false);
      setViewOrder(false);
      setCurrentComponent('');
      setServicesData(getVendorServicesObject());
      setSelectedServicesForOrder(getVendorServicesList());
      setOrderData(getVendorOrderObject());
      setOrderDetails([]);
      setAllServicesData([]);
    }
    if (currentComponent === 1 && orderData?.status === VENDOR_ORDER_STATUS?.confirmed) {
      _orderData.status = VENDOR_ORDER_STATUS?.completed;
      await addUpdateOrder(
        orderInfo[0]?.vendor_id,
        orderInfo[0]?.id,
        VENDOR_ORDER_STATUS?.completed,
      );
    }

    if (
      currentComponent === 2 ||
      (currentComponent === 2 && orderData?.status === VENDOR_ORDER_STATUS?.rejected)
    ) {
      setViewOrder(false);
      setCurrentComponent('');
      setOrderDetails([]);
      setServicesData(getVendorServicesObject());
      setSelectedServicesForOrder(getVendorServicesList());
      setOrderData(getVendorOrderObject());
      setAllServicesData([]);
    }

    onSuccess(_orderData.status);
    setOrderData(_orderData);
  };
  const rejectOrderHandler = async () => {
    const _orderData = structuredClone(orderData);
    _orderData.status = VENDOR_ORDER_STATUS?.rejected;
    await addUpdateOrder(orderInfo[0]?.vendor_id, orderInfo[0]?.id, VENDOR_ORDER_STATUS?.rejected);
    onSuccess(_orderData.status);
    setOrderData(_orderData);
    setViewOrder(false);
    setRejectOrder(false);
    setOrderDetails([]);
    setServicesData(getVendorServicesObject());
    setSelectedServicesForOrder(getVendorServicesList());
    setOrderData(getVendorOrderObject());
    setAllServicesData([]);
  };

  return (
    <>
      <VendorPopUp
        open={viewOrder}
        popUpState={[viewOrder, setViewOrder]}
        title="View Order"
        size="large"
        closeBtn={{ name: 'Reject', handleClick: () => setRejectOrder(true) }}
        isCloseButton={currentComponent === 0}
        isSubmitButton={
          (isVendor && currentComponent === 0) || currentComponent === 1 || currentComponent === 2
        }
        onCloseWithCross={() => {
          setCurrentComponent('');
          setViewOrder(false);
          setAllServicesData([]);
          setOrderDetails([]);
        }}
        submitBtn={{
          name:
            isVendor && currentComponent === 0
              ? 'Confirm'
              : !isVendor && currentComponent === 1
              ? 'Complete'
              : 'Ok',
          handleClick: () => {
            if (currentComponent === 0) {
              setConfirmOrder(true);
            } else {
              confirmOrderHandler();
            }
          },
        }}>
        <div>
          {!allServicesData?.length ? (
            <Loader customStyles={{ height: '300px', background: 'transparent' }} />
          ) : (
            <>
              {currentComponent === 0 && (
                <ReviewAndTaxConfirm isViewOrder={true} currency={allServicesData[0]?.currency} />
              )}
              {currentComponent === 1 && (
                <ReviewAndTaxConfirm isViewOrder={true} currency={allServicesData[0]?.currency} />
              )}
              {currentComponent === 2 && (
                <ReviewAndTaxConfirm isViewOrder={true} currency={allServicesData[0]?.currency} />
              )}
            </>
          )}
        </div>
      </VendorPopUp>
      {!!isRejectOrder && (
        <ConfirmPopUp
          title={`Are you sure to reject this order?`}
          btnObj={{
            handleClickLeft: (e) => {
              e.currentTarget.disabled = true;
              rejectOrderHandler();
            },
            handleClickRight: () => setRejectOrder(false),
          }}
        />
      )}
      {!!isConfirmOrder && (
        <ConfirmPopUp
          title={`Are you sure to Confirm this order?`}
          btnObj={{
            handleClickLeft: (e) => {
              e.currentTarget.disabled = true;
              confirmOrderHandler();
            },
            handleClickRight: () => setConfirmOrder(false),
          }}
        />
      )}
    </>
  );
};
export default ViewOrder;
