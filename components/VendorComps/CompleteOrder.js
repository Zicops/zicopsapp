import styles from './vendorComps.module.scss';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilValue } from 'recoil';
const CompleteOrder = ({ orderId }) => {
  const vendorData = useRecoilValue(VendorStateAtom);
  return (
    <div className={`${styles.CompleteItemContainer}`}>
      <div className={`${styles.circleImage}`}>
        <img src="/images/svg/check_circle.svg" alt="" />
      </div>
      <p className={`${styles.text1}`}>New Order Added</p>
      <p className={`${styles.text2}`}>
        A new order with Order ID "{orderId}" has been added.Do give your feedback of service post
        completion and delivery of the required services.
      </p>
      <div className={`${styles.newVendorAdd}`}>
        <span>New Vendor added to your Vendor list</span>
        <div className={`${styles.comapanyLogoName}`}>
          <div className={`${styles.logo}`}>
            <img src={vendorData?.photoUrl || '/images/discord_logo.png'} alt="" />
          </div>
          <div className={`${styles.comapanyName}`}>
            <p>{vendorData?.name}</p>
            <span>{vendorData?.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
