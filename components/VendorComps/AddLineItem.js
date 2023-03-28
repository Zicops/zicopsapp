import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useState } from 'react';
import styles from './vendorComps.module.scss';
import AddLineItemComp from './common/AddLineItemComp';
import { ServicesAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
const AddLineItem = () => {
  const [isExpertise, setIsExpertise] = useState(true);
  const [addLine, setAddLine] = useState(1);
  const [servicesData, setServicesData] = useRecoilState(ServicesAtom);
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

      {Array.from(Array(addLine).keys())?.map((item, i) => (
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
