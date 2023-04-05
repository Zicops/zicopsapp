import { useEffect } from 'react';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import ReviewOrderTop from './ReviewOrderTop';
import ReviewOrderBottom from './ReviewOrderBottom';
import { useRecoilState } from 'recoil';
import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
const ReviewAndTaxConfirm = ({ isViewOrder = false, orderStatus }) => {
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);

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

  const subtotalArray = orderArray?.map((data) => {
    if (!data?.isActive) return null;
    return data?.total;
  });
  // const subtotal = subtotalArray?.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue;
  // }, 0);

  const taxAmount = (orderData?.total * orderData?.tax) / 100;

  // const grossTotal = orderData?.total + taxAmount;

  // useEffect(() => {
  //   setOrderData({ ...orderData, total: subtotal, grossTotal: grossTotal });
  // }, [servicesData]);

  return (
    <div>
      {isViewOrder ? (
        <p className={`${styles.addLineText}`}>Order #123 has been {orderStatus}</p>
      ) : (
        <p className={`${styles.addLineText}`}>Confirm</p>
      )}
      <div className={`${styles.hr}`} />
      <ReviewOrderTop isConfirm={true} />
      <div className={`${styles.hr}`}></div>
      <ReviewOrderBottom
        isTax={false}
        taxAmount={taxAmount}
        // subtotal={orderData?.total}
        // grossTotal={grossTotal}
      />
      <div className={`${styles.hr}`}></div>
    </div>
  );
};

export default ReviewAndTaxConfirm;
