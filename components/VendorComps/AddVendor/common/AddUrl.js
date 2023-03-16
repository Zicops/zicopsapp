import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { changeHandler } from '@/helper/common.helper';
import React from 'react';
import styles from '../../vendorComps.module.scss';
const AddUrl = ({ inputName = '', urlData, setUrlData }) => {
  return (
    <div className={`${styles.input1}`}>
      <label for="addUser">Add URL: </label>
      <LabeledInput
        inputOptions={{
          inputName: inputName,
          placeholder: 'http://website_abc.com',
          value: urlData
        }}
        styleClass={`${styles.input5}`}
        changeHandler={(e) => setUrlData(e.target.value)}
      />
    </div>
  );
};

export default AddUrl;
