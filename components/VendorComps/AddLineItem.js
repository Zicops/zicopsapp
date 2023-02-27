import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { useState } from 'react';
import styles from './vendorComps.module.scss';
import AddLineItemComp from './common/AddLineItemComp';
const AddLineItem = () => {
  // const [lineUnit, setLineUnit] = useState(null);
  // const [lineCurrency, setLineCurrency] = useState(null);
  // const [lineDescription, setLineDescription] = useState('');
  // const [rate, setRate] = useState('');
  // const [count, setCount] = useState(0);
  const [isExpertise, setIsExpertise] = useState(true);
  // const unit = ['Per hour', 'Per day', 'Per month', 'Per module'].map((val) => ({
  //   label: val,
  //   value: val
  // }));

  // const currency = ['INR', 'USD', 'Euros', 'Pound'].map((val) => ({
  //   label: val,
  //   value: val
  // }));

  // const decrementHandler = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   }
  // };

  const addAnotherItemHandler = () => <AddLineItemComp />;

  return (
    <div>
      <div className={`${styles.checkBoxLabel}`}>
        <LabeledRadioCheckbox
          label={'Subject Matter Expertise'}
          type="checkbox"
          isChecked={isExpertise}
        />
      </div>
      {/* <div className={`${styles.lineContainer}`}>
      <div>
          <p className={`${styles.heading}`}>Description</p>
          <LabeledTextarea
            styleClass={styles?.inputStyle}
            inputOptions={{
              inputName: 'summary',
              placeholder: 'Line item description (in 60 chars)',
              rows: 3,
              maxLength: 60,
              value: lineDescription
            }}
            changeHandler={(e) => setLineDescription(e.target.value)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Unit</p>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'unit',
              placeholder: '/hour',
              value: lineUnit,
              options: unit
            }}
            changeHandler={(val) => setLineUnit(val)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Currency</p>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'unit',
              placeholder: 'INR',
              value: lineCurrency,
              options: currency
            }}
            changeHandler={(val) => setLineCurrency(val)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Rate (INR/hr)</p>
          <LabeledInput
            inputOptions={{
              inputName: 'rate',
              placeholder: '5000',
              value: rate
            }}
            inputClass={`${styles.lineInput}`}
            changeHandler={(e) => setRate(e.target.value)}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Quantity</p>
          <div className={`${styles.quantity}`}>
            <span onClick={decrementHandler}>-</span>
            <p>{count}</p>
            <span onClick={() => setCount(count + 1)}>+</span>
          </div>
        </div>
        <div>
          <p className={`${styles.heading}`}>Total</p>
          <div className={`${styles.total}`}>
            <p>1</p>
          </div>
        </div>
      </div>
      */}

      <AddLineItemComp />
      <div className={`${styles.addAnotherItem}`}>
        <p onClick={addAnotherItemHandler}>+</p>
        <span>Add another line item</span>
      </div>
    </div>
  );
};

export default AddLineItem;
