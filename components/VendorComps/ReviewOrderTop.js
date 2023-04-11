import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
import {
  OrderAtom,
  ServicesAtom,
  VendorServicesListAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './vendorComps.module.scss';
const ReviewOrderTop = ({ isConfirm }) => {
  const vendorData = useRecoilValue(VendorStateAtom);

  const [servicesData, setServiceData] = useRecoilState(ServicesAtom);
  const [orderData, setOrderData] = useRecoilState(OrderAtom);

  const selectedServicesForOrder = useRecoilValue(VendorServicesListAtom);

  const orderArray = [];
  if (servicesData?.sme?.length) {
    orderArray.push(...servicesData?.sme);
  }
  if (servicesData?.crt?.length) {
    orderArray.push(...servicesData?.crt);
  }
  if (servicesData?.cd?.length) {
    orderArray.push(...servicesData?.cd);
  }
  if (servicesData?.speakers?.length) {
    orderArray.push(...servicesData?.speakers);
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
          <>
            {servicesData?.[service]?.map((value, i) => {
              return (
                <div className={`${styles.OrderDetails}`} key={service}>
                  <div className={`${styles.checkBoxLabel}`}>
                    <LabeledRadioCheckbox
                      label={VENDOR_SERVICES_TYPE?.[value?.serviceType]?.label}
                      type="checkbox"
                      value={VENDOR_SERVICES_TYPE?.[value?.serviceType]?.label}
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
                      {value?.rate} {orderData?.currency}
                      {value?.unit}
                    </p>
                    <span>{value?.quantity}</span>
                    <span>
                      {value?.total} {orderData?.currency}
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
