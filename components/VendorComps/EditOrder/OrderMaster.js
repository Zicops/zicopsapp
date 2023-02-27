import styles from '../vendorComps.module.scss';

export default function OrderMaster() {
  const dateNameID = [
    { label: 'Date', value: '23/02/2023' },
    { label: 'Vendor Name', value: 'ABC Pvt. Ltd.' },
    { label: 'Order ID', value: '#111' }
  ];

  const statusTypeServie = [
    { label: 'Status', value: 'Added' },
    { label: 'Vendor Type', value: 'Organisation' },
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
