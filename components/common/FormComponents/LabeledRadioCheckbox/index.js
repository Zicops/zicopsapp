import { labeledRadioCheckboxWrapper, checkmark, radiomark } from '../formComponents.module.scss';
const LabeledCheckbox = ({ label, type, name, value, isChecked, isDisabled, changeHandler }) => {
  return (
    <label className={labeledRadioCheckboxWrapper}>
      <input type={type} name={name} value={value} checked={isChecked} disabled={isDisabled} />
      <span className={type === 'checkbox' ? checkmark : radiomark}></span>
      {label}
    </label>
  );
};

export default LabeledCheckbox;