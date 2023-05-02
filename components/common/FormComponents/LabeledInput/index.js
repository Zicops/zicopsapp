import { bool, func, number, oneOfType, shape, string } from 'prop-types';
import { halfInputWrapper, labeledInputWrapper, columnWise } from '../formComponents.module.scss';

export default function LabeledInput({
  inputOptions,
  styleClass,
  inputClass,
  changeHandler,
  isFiftyFifty = false,
  isColumnWise = false,
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
    isNumericOnly = false,
  } = inputOptions;
  return (
    <div
      className={`${labeledInputWrapper} ${isFiftyFifty ? halfInputWrapper : ''} ${
        isColumnWise ? columnWise : ''
      } ${styleClass}`}>
      {label && (
        <label
          htmlFor={inputName}
          aria-label={inputName}
          className="w-100"
          style={{ display: 'flex' }}>
          {label}
        </label>
      )}

      <input
        type={type}
        className={`${!isColumnWise && label ? 'w-75' : 'w-100'} ${inputClass}`}
        name={inputName}
        placeholder={placeholder}
        value={
          isNumericOnly ? value?.toString()?.replace(/^0+/, '') || '0' : value?.toString() || ''
        }
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
  label: string,
  placeholder: string.isRequired,
  value: oneOfType([string, number]),
  maxLength: number,
  isRequired: bool,
  isDisabled: bool,
  isAutoComplete: bool,
  isNumericOnly: bool,
});

LabeledInput.propTypes = {
  inputOptions: LabeledInputObj,
  styleClass: string,
  changeHandler: func,
};
