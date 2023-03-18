import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { useState } from 'react';
import styles from './vendorComps.module.scss';
import AddLineItemComp from './common/AddLineItemComp';
const AddLineItem = () => {
  const [isExpertise, setIsExpertise] = useState(true);
  const [addLine, setAddLine] = useState(1);

  const addAnotherItemHandler = () => setAddLine(addLine + 1);
  return (
    <div>
      <div className={`${styles.checkBoxLabel}`}>
        <LabeledRadioCheckbox
          label={'Subject Matter Expertise'}
          type="checkbox"
          isChecked={isExpertise}
        />
      </div>

      {Array.from(Array(addLine).keys())?.map((item) => (
        <AddLineItemComp />
      ))}

      <div className={`${styles.addAnotherItem}`}>
        <p onClick={() => addAnotherItemHandler()}>+</p>
        <span>Add another line item</span>
      </div>
    </div>
  );
};

export default AddLineItem;
