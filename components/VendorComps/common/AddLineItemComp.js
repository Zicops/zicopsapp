import styles from '../vendorComps.module.scss';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { useEffect, useState } from 'react';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { currency, unit } from '../Logic/vendorComps.helper';
import { ServicesAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { changeHandler } from '@/helper/common.helper';

export default function AddLineItemComp({ index, service }) {
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);

  useEffect(() => {
    const tempArray = structuredClone(servicesData);
    tempArray[service][index].total =
      servicesData?.[service]?.[index]?.rate * servicesData?.[service]?.[index]?.quantity;
    setServicesData(tempArray);
  }, [servicesData?.[service]?.[index]?.rate, servicesData?.[service]?.[index]?.quantity]);

  const decrementHandler = () => {
    if (servicesData?.[service]?.[index]?.quantity === 0) return;

    const tempArray = structuredClone(servicesData);
    tempArray[service][index].quantity -= 1;
    setServicesData(tempArray);
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
            value: servicesData?.[service]?.[index]?.description
          }}
          changeHandler={(e) => {
            const tempArray = structuredClone(servicesData);
            tempArray[service][index].description = e.target.value;
            setServicesData(tempArray);
          }}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Unit</p>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'unit',
            placeholder: '/hour',
            value: {
              label: servicesData?.[service]?.[index]?.unit,
              value: servicesData?.[service]?.[index]?.unit
            },
            options: unit
          }}
          changeHandler={(e) => {
            const tempArray = structuredClone(servicesData);
            tempArray[service][index].unit = e.value;
            setServicesData(tempArray);
          }}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Currency</p>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'currency',
            placeholder: 'INR',
            value: {
              label: servicesData?.[service]?.[index]?.currency,
              value: servicesData?.[service]?.[index]?.currency
            },
            options: currency
          }}
          changeHandler={(e) => {
            const tempArray = structuredClone(servicesData);
            tempArray[service][index].currency = e.value;
            setServicesData(tempArray);
          }}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Rate (INR/hr)</p>
        <LabeledInput
          inputOptions={{
            inputName: 'rate',
            placeholder: '',
            value: servicesData?.[service]?.[index]?.rate,
            isNumericOnly: true
          }}
          inputClass={`${styles.lineInput}`}
          changeHandler={(e) => {
            const tempArray = structuredClone(servicesData);
            tempArray[service][index].rate = e.target.value;
            setServicesData(tempArray);
          }}
        />
      </div>
      <div>
        <p className={`${styles.heading}`}>Quantity</p>
        <div className={`${styles.quantity}`}>
          <span onClick={decrementHandler}>-</span>
          <p>{servicesData?.[service]?.[index]?.quantity}</p>

          <span
            onClick={() => {
              const tempArray = structuredClone(servicesData);
              tempArray[service][index].quantity += 1;
              setServicesData(tempArray);
            }}>
            +
          </span>
        </div>
      </div>
      <div>
        <p className={`${styles.heading}`}>Total</p>
        <div className={`${styles.total}`}>
          <p>{servicesData?.[service]?.[index]?.total || 0}</p>
        </div>
      </div>
    </div>
  );
}
