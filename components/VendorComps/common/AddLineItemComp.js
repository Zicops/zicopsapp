import styles from '../vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { useState } from 'react';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { currency, unit } from '../Logic/vendorComps.helper';
import { ServicesAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { changeHandler } from '@/helper/common.helper';

export default function AddLineItemComp() {
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);

  const decrementHandler = () => {
    if (servicesData?.quantity > 0) {
      setServicesData({ ...servicesData, quantity: servicesData?.quantity - 1 });
    }
  };
  return (
    <div className={`${styles.lineContainer}`}>
      <div>
        <p className={`${styles.heading}`}>Description</p>
        <LabeledTextarea
          styleClass={styles?.inputStyle}
          inputOptions={{
            inputName: 'description',
            placeholder: 'Line item description (in 60 chars)',
            rows: 3,
            maxLength: 60,
            value: servicesData?.description
          }}
          changeHandler={(e) => changeHandler(e, servicesData, setServicesData)}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Unit</p>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'unit',
            placeholder: '/hour',
            value: {
              label: servicesData?.unit,
              value: servicesData?.unit
            },
            options: unit
          }}
          changeHandler={(e) => changeHandler(e, servicesData, setServicesData, 'unit')}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Currency</p>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'currency',
            placeholder: 'INR',
            value: {
              label: servicesData?.currency,
              value: servicesData?.currency
            },
            options: currency
          }}
          changeHandler={(e) => changeHandler(e, servicesData, setServicesData, 'currency')}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Rate (INR/hr)</p>
        <LabeledInput
          inputOptions={{
            inputName: 'rate',
            placeholder: '',
            value: servicesData?.rate
          }}
          inputClass={`${styles.lineInput}`}
          changeHandler={(e) => changeHandler(e, servicesData, setServicesData)}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Quantity</p>
        <div className={`${styles.quantity}`}>
          <span onClick={decrementHandler}>-</span>
          <p>{servicesData?.quantity}</p>

          <span
            onClick={() =>
              setServicesData({ ...servicesData, quantity: servicesData?.quantity + 1 })
            }>
            +
          </span>
        </div>
      </div>
      <div>
        <p className={`${styles.heading}`}>Total</p>
        <div className={`${styles.total}`}>
          <p>{servicesData?.rate * servicesData?.quantity}</p>
        </div>
      </div>
    </div>
  );
}
