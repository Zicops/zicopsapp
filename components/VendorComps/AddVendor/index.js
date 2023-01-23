import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import React from 'react'
import styles from './addvendor.module.scss'
const VendorAdd = ({title , label1 , lable2 , value1 , value2 , name1, changeHandler1 , changeHandler2 , checked1 , checked2}) => {
  return (
      <div className={`${styles.addVendorContainer}`}>
          <p>{title}</p>
          <div className={`${styles.radioButton}`}>
          <LabeledRadioCheckbox label={label1} value={value1} changeHandler={changeHandler1} name={name1} isChecked={checked1} />
              <LabeledRadioCheckbox label={lable2} value={value2} changeHandler={changeHandler2} name={name1} isChecked={checked2} />  
          </div>
    </div>
  )
}

export default VendorAdd;