import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { statusTypeServie } from '../Logic/vendorComps.helper';
import styles from '../vendorComps.module.scss';
import { useRecoilState } from 'recoil';

export default function OrderMaster({ orderData, serviceData }) {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const dateNameID = [
    { label: 'Date', value: '23/02/2023' },
    { label: 'Vendor Name', value: vendorData?.name },
    { label: 'Order ID', value: orderData?.id }
  ];
  const statusTypeServie = [
    { label: 'Status', value: 'Added' },
    { label: 'Vendor Type', value: vendorData?.type },
    { label: 'Services', value: 'SME, Content Development' }
  ];

  return (
    <div className={`${styles.orderMasterContainer}`}>
      <div className={`${styles.orderMasterDetails}`}>
        <div className={`${styles.dateNameID}`}>
          {dateNameID?.map((data, index) => (
            <div key={index}>
              <span>{data?.label} : </span>
              <span className={`${styles.valueDTI}`}>{data?.value}</span>
            </div>
          ))}
        </div>
        <div className={`${styles.statusTypeService}`}>
          {statusTypeServie?.map((data, index) => (
            <div key={index}>
              <span>{data?.label} : </span>
              <span className={`${styles.valueSTS}`}>{data?.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.orderDescription}`}>
        <p>Order Description</p>
        <p className={`${styles.valueDescription}`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is
          simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy
          text of the printing and typesetting industry.
        </p>
      </div>
    </div>
  );
}
