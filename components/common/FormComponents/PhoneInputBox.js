import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './formComponents.module.scss';

export default function PhoneInputBox({ changeHandler, value, isLabel = true }) {
  return (
    <>
      <PhoneInput
        containerClass={`${styles.labeledInputWrapper}`}
        containerStyle={isLabel ? { width: '75%' } : { width: '100%' }}
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
}
