import React, { useState } from 'react';
import Button from '../Button';
import LabeledInputs from '../LabeledInput';
import OrgFormLayout from '../OrgFormLayout';
import styles from './orgEmail.module.scss';

const OrgEmail = () => {
  const [emailValue, setEmailValue] = useState();
  return (
    <OrgFormLayout isHeaderVisible={false}>
      <div className={`${styles.page_layout}`}>
        <div>
          <img src="./images/svg/mail.svg" alt="" />
          <p className={`${styles.page_head}`}>Email</p>
        </div>
        <p className={`${styles.page_title}`}>
          Provide your email address to be the first to hear about our special offers, new products
          and more!
        </p>
        <LabeledInputs
          inputOptions={{
            inputName: 'spocEmail',
            placeholder: 'Enter your work email address',
            value: emailValue
          }}
        />
        <div className={`${styles.btnContainer}`}>
          <Button size="small" isBold="bold">
            Proceed
          </Button>
        </div>
      </div>
    </OrgFormLayout>
  );
};

export default OrgEmail;
