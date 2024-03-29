import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Button from '../../Button';
import LabeledInputs from '../../LabeledInput';
import OrgFormLayout from '../OrgFormLayout';
import styles from './orgEmail.module.scss';
import { changeHandler , isEmail } from '@/helper/common.helper';
import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { useEffect } from 'react';
import useHandleOrgForm from '../utils/orgResgisterForm.helper'

const OrgEmail = () => {
  const [orgTempDetails, setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);
  const router = useRouter();

  const { addEmail , isButtonDisable } = useHandleOrgForm();
  useEffect(()=>{
    // console.log(orgTempDetails?.orgPersonEmailId)
  },[orgTempDetails?.orgPersonEmailId])
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
            inputName: 'orgPersonEmailId',
            placeholder: 'Enter your work email address',
            value: orgTempDetails?.orgPersonEmailId,
            
          }}
          changeHandler={(e) => changeHandler(e, orgTempDetails, setOrgTempDetails)}
          inputClass={styles?.inputStyle}
        />
        <div className={`${styles.btnContainer}`}>
          <Button
            size="small"
            isBold="bold"
            isDisabled={!(orgTempDetails?.orgPersonEmailId?.length && isEmail(orgTempDetails?.orgPersonEmailId)) || isButtonDisable}
            clickHandler={async() => {
              if(!orgTempDetails?.orgPersonEmailId?.length) return ;
              const res = await addEmail();
              if(!res) return setToastMsg({type:'danger', message:'Error while sending the mail retry!'});
              router.push('create-learning-space/org-register');
            }}>
            Proceed
          </Button>
        </div>
      </div>
    </OrgFormLayout>
  );
};

export default OrgEmail;
