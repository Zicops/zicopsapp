import { OrderAtom, ServicesAtom } from '@/state/atoms/vendor.atoms';
import AddLineItem from '../AddLineItem';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import { useRecoilState } from 'recoil';
import ReviewOrderTop from '../ReviewOrderTop';
import ReviewOrderBottom from '../ReviewOrderBottom';
export default function OrderDetails() {
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const taxAmount = (orderData?.total * orderData?.tax) / 100;

  return (
    <div>
      <AddLineItem />
      <div className={`${styles.hr}`} />
      <p className={`${styles.editLineText}`}>Commercials</p>
      <ReviewOrderTop />
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
}
