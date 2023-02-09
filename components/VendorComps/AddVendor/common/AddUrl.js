import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { changeHandler } from '@/helper/common.helper';
import React from 'react';
import styles from '../../vendorComps.module.scss';
const AddUrl = ({ inputName = '', Value, urlData, setUrlData }) => {
  return (
    <div className={`${styles.input1}`}>
      <label for="addUser">Add URL: </label>
      <LabeledInput
        inputOptions={{
          inputName: inputName,
          placeholder: 'http://website_abc.com',
          value: Value
        }}
        styleClass={`${styles.input5}`}
        changeHandler={(e) => changeHandler(e, urlData, setUrlData)}
      />
    </div>
  );
};

export default AddUrl;
