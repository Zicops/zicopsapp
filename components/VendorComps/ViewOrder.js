import React, { useEffect, useState } from 'react';
import VendorPopUp from './common/VendorPopUp';
import ReviewAndTaxConfirm from './ReviewAndTaxConfirm';
import { useRouter } from 'next/router';
import { AllServicesAtom, ServicesAtom, VendorServicesListAtom } from '@/state/atoms/vendor.atoms';
import useHandleMarketYard from './Logic/useHandleMarketYard';
import { useRecoilState } from 'recoil';
import useHandleVendor from './Logic/useHandleVendor';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';

const ViewOrder = ({ orderId = null }) => {
  const [viewOrder, setViewOrder] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(0);
  const router = useRouter();
  const [selectedServicesForOrder, setSelectedServicesForOrder] =
    useRecoilState(VendorServicesListAtom);
  const [allServicesData, setAllServicesData] = useRecoilState(AllServicesAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const { getSingleVendorInfo } = useHandleVendor();
  const { orderDetails, getAllOrders, getOrderServices, getVendorServices, getOrders } =
    useHandleMarketYard();

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
  }, [orderInfo[0]?.vendor_id, orderInfo[0]?.id]);

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
  const confirmOrderHandler = async () => {
    setCurrentComponent(currentComponent + 1);

    if (currentComponent === 2) {
      setViewOrder(false);
    }
  };
  const rejectOrderHandler = async () => {
    setViewOrder(false);
  };
  return (
    <VendorPopUp
      open={viewOrder}
      popUpState={[viewOrder, setViewOrder]}
      title="View Order"
      size="large"
      closeBtn={{ name: 'Reject', handleClick: rejectOrderHandler }}
      isCloseButton={currentComponent === 0}
      submitBtn={{
        name: currentComponent === 0 ? 'Confirm' : 'OK',
        handleClick: confirmOrderHandler
      }}>
      <div>
        {currentComponent === 0 && (
          <ReviewAndTaxConfirm
            isViewOrder={true}
            orderStatus="Added"
            currency={allServicesData[0]?.currency}
          />
        )}
        {currentComponent === 1 && (
          <ReviewAndTaxConfirm
            isViewOrder={true}
            orderStatus="Confirmed"
            currency={allServicesData[0]?.currency}
          />
        )}
        {currentComponent === 2 && (
          <ReviewAndTaxConfirm
            isViewOrder={true}
            orderStatus="Completed"
            currency={allServicesData[0]?.currency}
          />
        )}
      </div>
    </VendorPopUp>
  );
};

export default ViewOrder;
