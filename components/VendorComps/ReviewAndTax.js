import styles from '@/components/VendorComps/vendorComps.module.scss';
import ReviewOrderTop from './ReviewOrderTop';
import ReviewOrderBottom from './ReviewOrderBottom';
import { useRecoilState } from 'recoil';
import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
const ReviewAndTax = () => {
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

  useEffect(() => {
    setOrderData({ ...orderData, total: subtotal, grossTotal: subtotal });
  }, [servicesData]);

  return (
    <div>
      <p className={`${styles.addLineText}`}>Review and Add Tax</p>
      <div className={`${styles.hr}`}></div>
      <ReviewOrderTop isConfirm={false} data={servicesData} />
      <div className={`${styles.hr}`}></div>
      <ReviewOrderBottom isTax={true} subtotal={subtotal} grossTotal={subtotal} />
      <div className={`${styles.hr}`}></div>
    </div>
  );
};

export default ReviewAndTax;
