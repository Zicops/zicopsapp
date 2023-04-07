import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
import AddLineItem from '../AddLineItem';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import { useRecoilState } from 'recoil';
import ReviewOrderTop from '../ReviewOrderTop';
import ReviewOrderBottom from '../ReviewOrderBottom';
import { useEffect } from 'react';
export default function OrderDetails() {
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
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
  const subtotal = subtotalArray?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const taxAmount = (subtotal * orderData?.tax) / 100;

  const grossTotal = subtotal + taxAmount;

  useEffect(() => {
    setOrderData({
      ...orderData,
      total: subtotal,
      grossTotal: grossTotal,
      currency: orderArray[0]?.currency
    });
  }, [servicesData, grossTotal]);

  return (
    <div>
      <AddLineItem />
      <div className={`${styles.hr}`} />
      <p className={`${styles.editLineText}`}>Commercials</p>
      <ReviewOrderTop />
      <div className={`${styles.hr}`}></div>
      <ReviewOrderBottom isTax={false} taxAmount={taxAmount} />
      <div className={`${styles.hr}`}></div>
    </div>
  );
}
