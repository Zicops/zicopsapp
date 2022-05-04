import { func, bool, string, number, shape } from 'prop-types';
import { labeledTextareaWrapper } from '../formComponents.module.scss';

export default function LabeledTextarea({ inputOptions, styleClass, changeHandler }) {
  const {
    inputName,
    rows = 4,
    label,
    placeholder = ' ',
    value,
    maxLength,
    isRequired,
    isDisabled,
    isAutoComplete
  } = inputOptions;
  return (
    <div className={`${labeledTextareaWrapper} ${styleClass}`}>
      {label && (
        <label htmlFor={inputName} aria-label={inputName}>
          {label}
        </label>
      )}
      <textarea
        name={inputName}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={changeHandler}
        maxLength={maxLength}
        required={!!isRequired}
        disabled={!!isDisabled}
        autoComplete={!!isAutoComplete}></textarea>
    </div>
  );
}

//   Default value for type is 'text', placeholder should not be empty. We are using &:not(:placeholder-shown) for highlighting textinput
// LabeledInput.defaultProps = {
//     [inputOptions.type] : 'text',
//     [inputOptions.placeholder] : ' '
// };

// const LabeledInputObj = shape({
//   inputName: string.isRequired,
//   label: string.isRequired,
//   placeholder: string.isRequired,
//   value: string || number,
//   maxLength: number,
//   isRequired: bool,
//   isDisabled: bool,
//   isAutoComplete: bool
// });

// LabeledInput.propTypes = {
//   inputOptions: LabeledInputObj,
//   styleClass: string,
//   changeHandler: func
// };
