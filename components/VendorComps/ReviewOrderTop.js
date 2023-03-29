import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { VENDOR_SERVICES_TYPE } from '@/helper/constants.helper';
import {
  getServicesObject,
  ServicesAtom,
  VendorServicesListAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './vendorComps.module.scss';
const ReviewOrderTop = ({ isConfirm, data }) => {
  const vendorData = useRecoilValue(VendorStateAtom);
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
      {orderArray?.map((order, i) => (
        <div className={`${styles.OrderDetails}`} key={i}>
          <div className={`${styles.checkBoxLabel}`}>
            <LabeledRadioCheckbox
              label={
                order?.serviceType === 'sme'
                  ? VENDOR_SERVICES_TYPE?.sme?.label
                  : order?.serviceType === 'crt'
                  ? VENDOR_SERVICES_TYPE?.crt?.label
                  : order?.serviceType === 'cd'
                  ? VENDOR_SERVICES_TYPE?.cd?.label
                  : ''
              }
              type="checkbox"
              value={
                order?.serviceType === 'sme'
                  ? VENDOR_SERVICES_TYPE?.sme?.value
                  : order?.serviceType === 'crt'
                  ? VENDOR_SERVICES_TYPE?.crt?.value
                  : order?.serviceType === 'cd'
                  ? VENDOR_SERVICES_TYPE?.cd?.value
                  : ''
              }
              isChecked={
                order?.serviceType === 'sme' ||
                order?.serviceType === 'crt' ||
                order?.serviceType === 'cd'
              }
              // changeHandler={(e) => {
              //   const { value, checked } = e.target;
              //   order.serviceType = !checked
              //     ? [getServicesObject({ isActive: false })]
              //     : [getServicesObject({ isActive: true })];
              // }}
            />
          </div>
          <p className={`${styles.contentName}`}>{order?.description}</p>
          <div className={`${styles.OrderValue}`}>
            <p>
              {order?.rate} {order?.currency}
              {order?.unit}
            </p>
            <span>{order?.quantity}</span>
            <span>
              {order?.total} {order?.currency}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewOrderTop;
