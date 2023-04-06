import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
import {
  OrderAtom,
  ServicesAtom,
  VendorServicesListAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './vendorComps.module.scss';
const ReviewOrderTop = ({ isConfirm }) => {
  const vendorData = useRecoilValue(VendorStateAtom);

  const [servicesData, setServiceData] = useRecoilState(ServicesAtom);
  const [orderData, setOrderData] = useRecoilState(OrderAtom);

  const selectedServicesForOrder = useRecoilValue(VendorServicesListAtom);

  return (
    <div>
      {isConfirm && (
        <div className={`${styles.companyName}`}>
          <p>For</p>
          <span>{vendorData?.name} </span>
        </div>
      )}
      {Object.keys(selectedServicesForOrder)?.map((service) => {
        return (
          <>
            {servicesData?.[service]?.map((value, i) => {
              return (
                <div className={`${styles.OrderDetails}`} key={service}>
                  <div className={`${styles.checkBoxLabel}`}>
                    <LabeledRadioCheckbox
                      label={
                        VENDOR_SERVICES_TYPE?.[value?.serviceType || value?.service_type]?.label
                      }
                      type="checkbox"
                      value={
                        VENDOR_SERVICES_TYPE?.[value?.serviceType || value?.service_type]?.label
                      }
                      isChecked={servicesData[service][i].isActive}
                      changeHandler={(e) => {
                        const { value, checked } = e.target;
                        const tempArray = structuredClone(servicesData);
                        tempArray[service][i].isActive = checked;
                        setServiceData(tempArray);
                      }}
                    />
                  </div>
                  <p className={`${styles.contentName}`}>{value?.description}</p>
                  <div className={`${styles.OrderValue}`}>
                    <p>
                      {value?.rate} {orderData?.currency || value?.currency}
                      {value?.unit}
                    </p>
                    <span>{value?.quantity}</span>
                    <span>
                      {value?.total} {orderData?.currency || value?.currency}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default ReviewOrderTop;
