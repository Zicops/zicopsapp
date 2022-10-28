import Button from 'common/components/Button';
import LabeledInputs from 'common/components/LabeledInput';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import OrgFormLayout from '../OrgFormLayout';
// import Button from '../../Button';
// import LabeledInputs from '../../LabeledInput';
// import OrgFormLayout from '../OrgFormLayout';
import styles from './orgGetStarted.module.scss';

const OrgGetStarted = () => {
  const [emailValue, setEmailValue] = useState();
  const router = useRouter();
  return (
    <OrgFormLayout isHeaderVisible={false}>
      <div className={`${styles.page_layout}`}>
        <div>
          <img src="/images/svg/flag.svg" alt="" />
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
          <Button size="medium" theme="dark" isBold="bold" clickHandler={()=>{router.push('/create-learning-space/org-register-form')}}>
            Register Organization
          </Button>
          <Button size="small" isBold="bold" clickHandler={()=>{router.push('/create-learning-space/org-unit-form')}} isDisabled={true}>
            Proceed
          </Button>
        </div>
      </div>
    </OrgFormLayout>
  );
};

export default OrgGetStarted;
