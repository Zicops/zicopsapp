import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
import { ServicesAtom, VendorServicesListAtom, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './vendorComps.module.scss';
const ReviewOrderTop = ({ isConfirm, data }) => {
  const vendorData = useRecoilValue(VendorStateAtom);

  const [serviceData, setServiceData] = useRecoilState(ServicesAtom);

  const selectedServicesForOrder = useRecoilValue(VendorServicesListAtom);

  const orderArray = [];
  if (data?.sme?.length) {
    orderArray.push(...data?.sme);
  }
  if (data?.crt?.length) {
    orderArray.push(...data?.crt);
  }
  if (data?.cd?.length) {
    orderArray.push(...data?.cd);
  }
  if (data?.speakers?.length) {
    orderArray.push(...data?.speakers);
  }

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
          <div className={`${styles.OrderDetails}`} key={service}>
            {serviceData?.[service]?.map((value, i) => {
              return (
                <>
                  <div className={`${styles.checkBoxLabel}`}>
                    <LabeledRadioCheckbox
                      label={VENDOR_SERVICES_TYPE?.[value?.serviceType]?.label}
                      type="checkbox"
                      value={VENDOR_SERVICES_TYPE?.[value?.serviceType]?.label}
                      isChecked={serviceData[service][i].isActive}
                      changeHandler={(e) => {
                        const { value, checked } = e.target;
                        const tempArray = structuredClone(serviceData);
                        tempArray[service][i].isActive = checked;
                        setServiceData(tempArray);
                      }}
                    />
                  </div>
                  <p className={`${styles.contentName}`}>{value?.description}</p>
                  <div className={`${styles.OrderValue}`}>
                    <p>
                      {value?.rate} {value?.currency}
                      {value?.unit}
                    </p>
                    <span>{value?.quantity}</span>
                    <span>
                      {value?.total} {value?.currency}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewOrderTop;
