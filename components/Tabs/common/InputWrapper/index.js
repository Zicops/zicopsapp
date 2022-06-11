import React from 'react';
import styles from '../../courseTabs.module.scss';

export default function InputWrapper({ inputName, label, children, isFullWidth = true }) {
  return (
    <div className={`${styles.inputWrapper} ${isFullWidth ? styles.widthFull : styles.widthHalf}`}>
      <label htmlFor={inputName} className={`${styles.label}`}>
        {label}
      </label>

      {/* add class and value to child dynamically */}
      {React.Children.map(children, (child) => {
        console.log(child);
        return React.cloneElement(child, {
          className: `${child.props.className} ${styles.input} ${
            child.props.value ? styles.highlight : ''
          }`,
          name: child.props.inputName
        });
      })}
    </div>
  );
}
