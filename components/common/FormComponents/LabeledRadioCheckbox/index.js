import { labeledRadioCheckboxWrapper, checkmark, radiomark } from '../formComponents.module.scss';
const LabeledRadioCheckbox = ({ label, type, name, isChecked, isDisabled, changeHandler }) => {
  return (
    <label className={labeledRadioCheckboxWrapper}>
      <input
        type={type}
        onChange={changeHandler}
        name={name}
        checked={isChecked}
        disabled={isDisabled}
      />
      <span className={type === 'checkbox' ? checkmark : radiomark}></span>
      {label}
    </label>
  );
};

export default LabeledRadioCheckbox;
