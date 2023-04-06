import React, { useState } from 'react';
import VendorPopUp from './common/VendorPopUp';
import ReviewAndTaxConfirm from './ReviewAndTaxConfirm';

const ViewOrder = () => {
  const [viewOrder, setViewOrder] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(0);

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
    <div>
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
    </div>
  );
};

export default ViewOrder;
