import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './orgPhoneInput.module.scss';

const OrgPhoneInput = ({ changeHandler, value, label }) => {
  return (
    <>
      <label style={{ width: '100%', color: 'white', marginBottom: '5px' }}>{label}</label>
      <PhoneInput
        containerClass={`${styles.labeledInputWrapper}`}
        containerStyle={{ width: '100%' }}
        inputClass={`${styles.inputStyles}`}
        inputStyle={{ width: '100%', paddingLeft: '50px' }}
        buttonClass={`${styles.countryCodeBtn}`}
        buttonStyle={{ background: 'var(--dark_two)' }}
        country={'in'}
        value={value}
        onChange={changeHandler}
      />
    </>
  );
};

export default OrgPhoneInput;
