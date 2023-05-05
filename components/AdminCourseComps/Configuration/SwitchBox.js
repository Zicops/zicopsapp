import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import styles from '../adminCourseComps.module.scss';

export default function SwitchBox({ labeledInputProps = {}, isFullWidth = false }) {
  const { label, description, isChecked } = labeledInputProps;

  return (
    <label
      className={`${styles.switchBoxContainer} ${isFullWidth ? 'w-100' : 'w-50'} ${
        labeledInputProps?.isDisabled ? 'disabled' : ''
      } ${isChecked ? styles.active : ''}`}>
      <div>
        <p className={`${styles.label}`}>{label}</p>
        <p className={`${styles.description}`}>{description}</p>
      </div>

      <SwitchButton {...labeledInputProps} label={null} />
    </label>
  );
}
