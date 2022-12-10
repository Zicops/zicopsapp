import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import styles from '../courseTabs.module.scss';

export default function RadioBox({ labeledInputProps = {} }) {
  const { label, description, isChecked } = labeledInputProps;

  return (
    <label
      className={`${styles.switchRadioBox} ${styles.radioBox} ${isChecked ? styles.active : ''}`}>
      <div>
        <LabeledRadioCheckbox {...labeledInputProps} type="radio" label={null} />
      </div>
      <p className={`${styles.label}`}>{label}</p>
      <p className={`${styles.description}`}>{description}</p>
    </label>
  );
}
