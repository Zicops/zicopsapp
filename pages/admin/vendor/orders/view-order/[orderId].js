import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import ReviewAndTaxConfirm from '@/components/VendorComps/ReviewAndTaxConfirm';

export default function ViewOrderInfo() {
  const [viewOrder, setViewOrder] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(0);

  const router = useRouter();
  const orderId = router.query.orderId || null;

  const confirmOrderHandler = async () => {
    setCurrentComponent(currentComponent + 1);

    if (currentComponent === 2) {
      setViewOrder(false);
      router.push(`/admin/vendor/orders`);
    }
  };
  const rejectOrderHandler = async () => {
    setViewOrder(false);
    router.push(`/admin/vendor/orders`);
  };

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="My orders" isAddShown={true} isProductTooltip={false} />
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
          {currentComponent === 0 && (
            <ReviewAndTaxConfirm
              isViewOrder={true}
              orderStatus="Added"
              setCurrentComponent={setCurrentComponent}
            />
          )}
          {currentComponent === 1 && (
            <ReviewAndTaxConfirm
              isViewOrder={true}
              orderStatus="Confirmed"
              setCurrentComponent={setCurrentComponent}
            />
          )}
          {currentComponent === 2 && (
            <ReviewAndTaxConfirm
              isViewOrder={true}
              orderStatus="Completed"
              setCurrentComponent={setCurrentComponent}
            />
          )}
        </VendorPopUp>
      </MainBody>
    </>
  );
}
