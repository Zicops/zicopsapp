import {
  checkmark,
  disabled,
  labeledRadioCheckboxWrapper,
  loading,
  radiomark
} from '../formComponents.module.scss';

const LabeledRadioCheckbox = ({
  label,
  type = 'radio',
  name,
  value,
  isChecked,
  isDisabled,
  isError,
  isLoading = false,
  changeHandler = function () {}
}) => {
  return (
    <span className={labeledRadioCheckboxWrapper}>
      <label>
        <input
          type={type}
          onChange={changeHandler}
          name={name}
          value={value}
          checked={isLoading ? false : isChecked}
          disabled={isDisabled}
        />
        <span
          className={`${type === 'checkbox' ? checkmark : radiomark} ${isLoading ? loading : ''} ${
            isDisabled ? disabled : ''
          } ${isError ? 'error' : ''}`}></span>
        {label}
      </label>
    </span>
  );
};

export default LabeledRadioCheckbox;
