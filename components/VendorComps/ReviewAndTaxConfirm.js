import styles from '@/components/VendorComps/vendorComps.module.scss';
import ReviewOrderTop from './ReviewOrderTop';
import ReviewOrderBottom from './ReviewOrderBottom';
import { useRecoilState } from 'recoil';
import { OrderAtom } from '@/state/atoms/vendor.atoms';
const ReviewAndTaxConfirm = ({ isViewOrder = false, orderStatus, currency }) => {
  const [orderData, setOrderData] = useRecoilState(OrderAtom);

  const taxAmount = (orderData?.total * orderData?.tax) / 100;

  return (
    <div>
      {isViewOrder ? (
        <p className={`${styles.addLineText}`}>
          Order "{orderData?.id}" has been {orderStatus}
        </p>
      ) : (
        <p className={`${styles.addLineText}`}>Confirm</p>
      )}
      <div className={`${styles.hr}`} />
      <ReviewOrderTop isConfirm={true} />
      <div className={`${styles.hr}`}></div>
      <ReviewOrderBottom isTax={false} taxAmount={taxAmount} currency={currency} />
      <div className={`${styles.hr}`}></div>
    </div>
  );
};

export default ReviewAndTaxConfirm;
