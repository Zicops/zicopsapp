import React from 'react';
import styles from './orgFormInputs.module.scss';

const LabeledInputs = ({ inputOptions, styleClass, inputClass, changeHandler }) => {
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
    <div className={`${styles.labeledInputWrapper} ${styleClass}`}>
      <label htmlFor={inputName}>{label}</label>
      <input
        type={type}
        className={``}
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
};

export default LabeledInputs;
