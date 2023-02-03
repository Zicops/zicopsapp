import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from './vendorComps.module.scss';
const ReviewOrderTop = ({ isConfirm }) => {
  return (
    <div>
      {isConfirm && (
        <div className={`${styles.companyName}`}>
          <p>For</p>
          <span>For ABC Learning Technology Pvt. Ltd </span>
        </div>
      )}
      <div className={`${styles.checkBoxLabel}`}>
        <LabeledRadioCheckbox label={'Subject Matter Expertise'} type="checkbox" />
      </div>
      <div className={`${styles.OrderDetails}`}>
        <div>
          <p className={`${styles.contentName}`}>Product SME - Abhishek Ghosh</p>
        </div>
        <div className={`${styles.OrderValue}`}>
          <p>5000 INR/hr</p>
          <span>60</span>
          <span>300000 INR</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderTop;
