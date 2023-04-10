import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import styles from '../vendorComps.module.scss';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import Loader from '@/components/common/Loader';

export default function OrderMaster({ orderData, services }) {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);

  const dateNameID = [
    { label: 'Date', value: moment.unix(orderData?.created_at).format('YYYY-MM-DD') },
    { label: 'Vendor Name', value: vendorData?.name },
    { label: 'Order ID', value: orderData?.id }
  ];
  const statusTypeServie = [
    { label: 'Status', value: orderData?.status },
    { label: 'Vendor Type', value: vendorData?.type },
    { label: 'Services', value: services?.toString().toUpperCase() }
  ];

  if (!orderData || !services || !vendorData)
    return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;

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
        <p>Order Description : </p>
        <p className={`${styles.valueDescription}`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is
          simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy
          text of the printing and typesetting industry.
        </p>
      </div>
    </div>
  );
}
