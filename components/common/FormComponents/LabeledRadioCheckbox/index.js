import {
  labeledRadioCheckboxWrapper,
  checkmark,
  radiomark,
  disabled
} from '../formComponents.module.scss';

const LabeledRadioCheckbox = ({
  label,
  type,
  name,
  value,
  isChecked,
  isDisabled,
  isError,
  changeHandler = function () {}
}) => {
  return (
    <label className={labeledRadioCheckboxWrapper}>
      <input
        type={type}
        onChange={changeHandler}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
      />
      <span
        className={`${type === 'checkbox' ? checkmark : radiomark} ${isDisabled ? disabled : ''} ${
          isError ? 'error' : ''
        }`}></span>
      {label}
    </label>
  );
};

export default LabeledRadioCheckbox;
