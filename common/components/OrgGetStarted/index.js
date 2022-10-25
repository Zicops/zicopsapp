import React, { useState } from 'react';
import Button from '../Button';
import LabeledInputs from '../LabeledInput';
import OrgFormLayout from '../OrgFormLayout';
import styles from './orgGetStarted.module.scss';

const OrgGetStarted = () => {
  const [emailValue, setEmailValue] = useState();
  return (
    <OrgFormLayout isHeaderVisible={false}>
      <div className={`${styles.page_layout}`}>
        <div>
          <img src="./images/svg/flag.svg" alt="" />
          <p className={`${styles.page_head}`}>Lets get started</p>
        </div>
        <p className={`${styles.page_title}`}>
          An organization is mapped to multiple learning spaces. Find your organization to see if
          your organization is already registered with us.
        </p>
        <p className={`${styles.form_title}`}>If your organization doesn’t exist, create one!</p>
        <LabeledInputs
          inputOptions={{
            inputName: 'spocEmail',
            placeholder: 'Enter your work email address',
            value: emailValue
          }}
        />
        <div className={`${styles.btnContainer}`}>
          <Button size="medium" theme="dark" isBold="bold">
            Register Organization
          </Button>
          <Button size="small" isBold="bold">
            Proceed
          </Button>
        </div>
      </div>
    </OrgFormLayout>
  );
};

export default OrgGetStarted;
