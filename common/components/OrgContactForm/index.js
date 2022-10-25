import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { orgContactPersonData, orgUnitData } from 'common/utils/formComponent.helper';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LabeledInputs from '../LabeledInput';
import LabeledDropdown from '../DropDown';
import styles from '../OrganizationRegister/organizationRegister.module.scss';
import PhoneInputBox from '@/components/common/FormComponents/PhoneInputBox';
import Button from '../Button';
import LabeledTextarea from '../LabeledTextArea';
import OrgPhoneInput from '../OrgPhoneInput';
import IconLabeledInputs from '../IconLabeledInput';
import { changeHandler } from '@/helper/common.helper';
import useHandleOrgForm from 'common/utils/orgResgisterForm.helper';

const OrgContactForm = ({ setTab = () => {} }) => {
  const [orgTempDetails, setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);
  const { isContactFormReady } = useHandleOrgForm();
  const [formData,setFormData] = useState(orgContactPersonData);

  useEffect(()=>{
   if(orgTempDetails?.orgPersonRole?.toLowerCase() !== 'others') return setFormData(orgContactPersonData);
   if(formData?.length === 8) return ;
   const formInput =  {
     type: 'normalInput',
     inputOptions: {
       placeholder: 'Enter organizational role',
       inputName: 'orgPersonRoleOthers',
       label: 'Please specify others :'
      }
    }
    const data = [...orgContactPersonData];
    data?.splice(orgContactPersonData?.length - 2,0,formInput)
    // console.log('ipdae',orgContactPersonData,data)
    setFormData([...data])
    return;

  },[orgTempDetails])

  const INPUT_OBJECT = {
    normalInput: function (obj = {}) {
      // console.log(obj?.inputOptions,'inoutoptionss')
      // return <>hii</>;
      obj.inputOptions.value = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      return (
        <LabeledInputs
          inputOptions={obj?.inputOptions}
          styleClass={styles?.inputStyle}
          changeHandler={(e) => {
            changeHandler(e, orgTempDetails, setOrgTempDetails);
          }}
        />
      );
    },
    uploadInput: function (obj = {}) {
      // return <LabeledInputs />
    },
    dropDown: function (obj = {}) {
      const val = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      obj.inputOptions.value = { value: val, label: val };
      return (
        <LabeledDropdown
          dropdownOptions={obj?.inputOptions}
          styleClass={styles?.inputStyle}
          changeHandler={(e) =>
            changeHandler(e, orgTempDetails, setOrgTempDetails, `${obj?.inputOptions?.inputName}`)
          }
        />
      );
    },
    phoneInput: function (obj = {}) {
      return (
        <OrgPhoneInput
          label={obj?.inputOptions?.label}
          value={orgTempDetails[`${obj?.inputOptions?.inputName}`]}
          changeHandler={(phNo, data) => {
            setOrgTempDetails({ ...orgTempDetails, orgPersonContactNumber: phNo });
            // setPhCountryCode(data.countryCode?.toUpperCase());
          }}
        />
      );
    },
    iconInput: function (obj = {}) {
      obj.inputOptions.value = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      return (
        <IconLabeledInputs
          inputOptions={obj?.inputOptions}
          icon={obj?.iconType}
          changeHandler={(e) => changeHandler(e, orgTempDetails, setOrgTempDetails)}
        />
      );
    },
    textAreaInput: function (obj = {}) {
      obj.inputOptions.value = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      return (
        <LabeledTextarea
          inputOptions={obj?.inputOptions}
          styleClass={styles?.inputStyle}
          changeHandler={(e) => {
            changeHandler(e, orgTempDetails, setOrgTempDetails);
          }}
        />
      );
    }
  };
  return (
    <div className={`${styles?.orgRegisterContainer}`}>
      {formData?.map((form) => {
        return <>{INPUT_OBJECT[`${form?.type}`](form)}</>;
      })}
      <div className={`${styles?.btnContainer}`}>
        <Button size="small" theme="dark" clickHandler={() => setTab(1)}>
          Cancel
        </Button>
        <Button
          size="small"
          clickHandler={() => console.log(orgTempDetails)}
          isDisabled={!isContactFormReady}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OrgContactForm;
