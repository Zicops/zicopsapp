import styles from '@/components/VendorComps/vendorComps.module.scss';
import ReviewOrderTop from './ReviewOrderTop';
import ReviewOrderBottom from './ReviewOrderBottom';
import { useRecoilState } from 'recoil';
import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
const ReviewAndTaxConfirm = ({ isViewOrder = false, orderStatus }) => {
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);

  const taxAmount = (orderData?.total * orderData?.tax) / 100;

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
      <ReviewOrderBottom isTax={false} taxAmount={taxAmount} />
      <div className={`${styles.hr}`}></div>
    </div>
  );
};

export default ReviewAndTaxConfirm;
