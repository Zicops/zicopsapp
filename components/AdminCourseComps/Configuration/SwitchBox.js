import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import styles from '../adminCourseComps.module.scss';

export default function SwitchBox({ labeledInputProps = {} }) {
  const { label, description, isChecked } = labeledInputProps;

  return (
    <label className={`${styles.switchBoxContainer} ${isChecked ? styles.active : ''}`}>
      <div>
        <p className={`${styles.label}`}>{label}</p>
        <p className={`${styles.description}`}>{description}</p>
      </div>

      <SwitchButton {...labeledInputProps} label={null} />
    </label>
  );
}
