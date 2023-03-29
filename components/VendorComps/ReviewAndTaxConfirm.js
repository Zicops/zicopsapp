import React, { useEffect } from 'react';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import ReviewOrderTop from './ReviewOrderTop';
import ReviewOrderBottom from './ReviewOrderBottom';
import { useRecoilState } from 'recoil';
import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
const ReviewAndTaxConfirm = () => {
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);

  console.info('orderData', orderData);

  const taxAmount = (orderData?.total * 10) / 100;
  const grossTotal = orderData?.total + taxAmount;

  useEffect(() => {
    setOrderData({ ...orderData, tax: taxAmount, grossTotal: grossTotal });
  }, [servicesData]);
  return (
    <div>
      <p className={`${styles.addLineText}`}>Confirm</p>
      <div className={`${styles.hr}`}></div>
      <ReviewOrderTop isConfirm={true} data={servicesData} />
      <div className={`${styles.hr}`}></div>
      <ReviewOrderBottom
        isTax={false}
        taxAmount={taxAmount}
        subtotal={orderData?.total}
        grossTotal={grossTotal}
      />
      <div className={`${styles.hr}`}></div>
    </div>
  );
};

export default ReviewAndTaxConfirm;
