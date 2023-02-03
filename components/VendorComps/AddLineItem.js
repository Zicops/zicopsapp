import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import styles from './vendorComps.module.scss';
const AddLineItem = () => {
  const unit = ['Per hour', 'Per day', 'Per month', 'Per module'].map((val) => ({
    label: val,
    value: val
  }));

  const currency = ['INR', 'USD', 'Euros', 'Pound'].map((val) => ({
    label: val,
    value: val
  }));
  return (
    <div>
      <div className={`${styles.checkBoxLabel}`}>
        <LabeledRadioCheckbox label={'Subject Matter Expertise'} type="checkbox" />
      </div>
      <div className={`${styles.lineContainer}`}>
        <div>
          <p className={`${styles.heading}`}>Description</p>
          <LabeledTextarea
            styleClass={styles?.inputStyle}
            inputOptions={{
              inputName: 'summary',
              placeholder: 'Line item description (in 60 chars)',
              rows: 3,
              maxLength: 60
            }}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Unit</p>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'unit',
              placeholder: '/hour',
              options: unit
            }}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Currency</p>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'unit',
              placeholder: 'INR',
              options: currency
            }}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Rate (INR/hr)</p>
          <LabeledInput
            inputOptions={{
              inputName: 'rate',
              placeholder: '5000'
            }}
            inputClass={`${styles.lineInput}`}
          />
        </div>
        <div>
          <p className={`${styles.heading}`}>Quantity</p>
          <div className={`${styles.quantity}`}>
            <span>-</span>
            <p>01</p>
            <span>+</span>
          </div>
        </div>
        <div>
          <p className={`${styles.heading}`}>Total</p>
          <div className={`${styles.total}`}>
            <p>1</p>
          </div>
        </div>
      </div>
      <div className={`${styles.addAnotherItem}`}>
        <p>+</p>
        <span>Add another line item</span>
      </div>
    </div>
  );
};

export default AddLineItem;
