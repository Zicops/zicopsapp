import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { changeHandler } from '@/helper/common.helper';
import { OrderAtom } from '@/state/atoms/vendor.atoms';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import LabeledInput from '../common/FormComponents/LabeledInput';
import styles from './vendorComps.module.scss';
const ReviewOrderBottom = ({
  isTax,
  subtotal,
  grossTotal,
  taxAmount,
  currency,
  isShowTax,
  setShowTax
}) => {
  const [orderData, setOrderData] = useRecoilState(OrderAtom);
  const onShowTaxHandler = () => {
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
          <p>
            {subtotal} {currency}
          </p>
          {isTax && !isShowTax && (
            <div className={`${styles.taxAdd}`} onClick={onShowTaxHandler}>
              <span className={`${styles.pluse}`}>+</span>
              <span>Add Tax</span>
            </div>
          )}
          {isShowTax && (
            <LabeledInput
              inputOptions={{
                inputName: 'tax',
                value: orderData?.tax,
                isNumericOnly: true
              }}
              inputClass={`${styles.taxValue}`}
              changeHandler={(e) => {
                changeHandler(e, orderData, setOrderData);
              }}
            />
          )}
        </div>
      </div>
      <div className={`${styles.TaxAmount}`}>
        <p>Tax Amount</p>
        <p>
          {taxAmount || 0} {currency}
        </p>
      </div>
      <div className={`${styles.grossTotal}`}>
        <p>Gross Total</p>
        <p>
          {grossTotal} {currency}
        </p>
      </div>
    </div>
  );
};
export default ReviewOrderBottom;
