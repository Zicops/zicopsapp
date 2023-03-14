import { dateNameID, statusTypeServie } from '../Logic/vendorComps.helper';
import styles from '../vendorComps.module.scss';

export default function OrderMaster() {
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
