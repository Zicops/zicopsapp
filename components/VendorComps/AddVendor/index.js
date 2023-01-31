import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from './addvendor.module.scss';

// TODO: rename the function
export default function AddVendor({
  title = '',
  inputName = '',
  checkboxProps1 = {},
  checkboxProps2 = {}
}) {
  return (
    <>
      <div className={`${styles.addVendorContainer}`}>
        <p>{title}</p>

        <div className={`${styles.radioButton}`}>
          <LabeledRadioCheckbox name={inputName} type="radio" {...checkboxProps1} />
          <LabeledRadioCheckbox name={inputName} type="radio" {...checkboxProps2} />
        </div>
      </div>
    </>
  );
}
