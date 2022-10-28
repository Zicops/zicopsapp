import React, { useRef, useState } from 'react';
import styles from './iconLabeledInput.module.scss';

const IconLabeledInputs = ({
  inputOptions,
  styleClass,
  inputClass,
  changeHandler,
  icon = true
}) => {
  const BLUE_TICK_SVG = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.4348 6.33275L8.76165 20.0059L1.56525 12.0899L3.72417 9.93095L8.76165 15.6881L20.2759 4.17383L22.4348 6.33275Z"
        fill="#6BCFCF"
      />
    </svg>
  );

  const RED_TICK_SVG = (
    <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.59995 28.7992L7.19995 26.3992L15.6 17.9992L7.19995 9.59922L9.59995 7.19922L18 15.5992L26.4 7.19922L28.8 9.59922L20.4 17.9992L28.8 26.3992L26.4 28.7992L18 20.3992L9.59995 28.7992Z"
        fill="#ff0000"
      />
    </svg>
  );

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


  const [isFocus , setIsFocus] = useState(false);

  const inputStyle = {};
  const iconStyle = {};
  let image;
  if (typeof icon === 'boolean') {
    iconStyle.width = '10%';
    inputStyle.width = '90%';
    image = icon ? BLUE_TICK_SVG : RED_TICK_SVG;
  }
  if (typeof icon === 'string') {
    if( icon === 'none'){
      inputStyle.width = '100%';
      image = null
    }
    else{
      iconStyle.width = '25%';
      inputStyle.width = '75%';
      image = icon;
    }
  }
  return (
    <div className={`${styles.labeledInputWrapper} ${styleClass}`}>
      <label htmlFor={inputName}>{label}</label>
      <div className={`${styles.inputContainer} ${isFocus? styles?.focusInput : ''}`}>
        <input
          onFocus={()=>{ setIsFocus(true); 
          }}
          onBlur={()=>{setIsFocus(false)}}
          style={inputStyle}
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
        />{' '}
        <span style={iconStyle} className={`${styles.iconContainer}`}>{image}</span>
      </div>
    </div>
  );
};

export default IconLabeledInputs;
