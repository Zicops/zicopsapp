import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { useState } from 'react';
import styles from './vendorComps.module.scss';
const ReviewOrderBottom = ({ isTax, subtotal, grossTotal, taxAmount }) => {
  const [isShowTax, setShowTax] = useState(false);
  const onShowTaxHandler = ({ data }) => {
    setShowTax(true);
  };

  return (
    <div className={`${styles.ReviewBottomContainer}`}>
      <div className={`${styles.subTotal}`}>
        <div className={`${styles.percentage}`}>
          <p>Subtotal</p>
          {isShowTax && (
            <div>
              <LabeledDropdown
                dropdownOptions={{
                  inputName: 'percentage',
                  placeholder: '%'
                }}
              />
            </div>
          )}
        </div>
        <div>
          <p>{subtotal} INR</p>
          {isTax && !isShowTax && (
            <div className={`${styles.taxAdd}`} onClick={onShowTaxHandler}>
              <span className={`${styles.pluse}`}>+</span>
              <span>Add Tax</span>
            </div>
          )}
          {isShowTax && <div className={`${styles.taxValue}`}>10</div>}
        </div>
      </div>
      <div className={`${styles.TaxAmount}`}>
        <p>Tax Amount</p>
        <p>{taxAmount || 0} INR</p>
      </div>
      <div className={`${styles.grossTotal}`}>
        <p>Gross Total</p>
        <p>{grossTotal}INR</p>
      </div>
    </div>
  );
};
export default ReviewOrderBottom;
