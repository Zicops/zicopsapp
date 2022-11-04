// import { func, bool, string, number, shape } from 'prop-types';
import { labeledTextareaWrapper } from './orgFormTextArea.module.scss';

const LabeledTextarea = ({ inputOptions, styleClass, changeHandler, isError }) =>{
  const {
    inputName,
    rows = 4,
    label,
    placeholder = ' ',
    value,
    maxLength = 300,
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
        className={isError ? 'error' : ''}
        autoComplete={isAutoComplete?.toString()}></textarea>
    </div>
  );
}
export default LabeledTextarea;