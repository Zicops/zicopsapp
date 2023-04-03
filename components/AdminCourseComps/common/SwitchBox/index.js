import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import styles from './switchBox.module.scss';

export default function SwitchBox({ labeledInputProps = {} }) {
  const { label, description, isChecked } = labeledInputProps;

  return (
    <label
      className={`${styles.switchRadioBox} ${styles.switchBox} ${isChecked ? styles.active : ''}`}>
      <div>
        <p className={`${styles.label}`}>{label}</p>
        <p className={`${styles.description}`}>{description}</p>
      </div>

      <SwitchButton {...labeledInputProps} label={null} />
    </label>
  );
}
