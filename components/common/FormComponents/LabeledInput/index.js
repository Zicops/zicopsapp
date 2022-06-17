import { func, bool, string, number, shape } from 'prop-types';
import { labeledInputWrapper, halfInputWrapper } from '../formComponents.module.scss';

export default function LabeledInput({
  inputOptions,
  styleClass,
  changeHandler,
  isFiftyFifty = false
}) {
  const {
    inputName,
    type = 'text',
    label,
    placeholder = 'Enter the name in less than 160 characters',
    value,
    maxLength = 160,
    isRequired,
    isDisabled,
    isAutoComplete,
    isNumericOnly = false
  } = inputOptions;
  return (
    <div className={`${labeledInputWrapper} ${isFiftyFifty ? halfInputWrapper : ''} ${styleClass}`}>
      {label && (
        <label htmlFor={inputName} aria-label={inputName} className="w-100">
          {label}
        </label>
      )}

      <input
        type={type}
        className={label ? 'w-75' : 'w-100'}
        name={inputName}
        placeholder={placeholder}
        value={value}
        onKeyPress={(e) => {
          if (!isNumericOnly) return;

          const regexForNumber = /[0-9]/;
          if (!regexForNumber.test(e.key)) e.preventDefault();
        }}
        onChange={changeHandler}
        maxLength={maxLength}
        required={!!isRequired}
        disabled={!!isDisabled}
        autoComplete={isAutoComplete?.toString()}
      />
    </div>
  );
}

//   Default value for type is 'text', placeholder should not be empty. We are using &:not(:placeholder-shown) for highlighting textinput
// LabeledInput.defaultProps = {
//     [inputOptions.type] : 'text',
//     [inputOptions.placeholder] : ' '
// };

const LabeledInputObj = shape({
  inputName: string.isRequired,
  label: string.isRequired,
  placeholder: string.isRequired,
  value: string || number,
  maxLength: number,
  isRequired: bool,
  isDisabled: bool,
  isAutoComplete: bool
});

LabeledInput.propTypes = {
  inputOptions: LabeledInputObj,
  styleClass: string,
  changeHandler: func
};
