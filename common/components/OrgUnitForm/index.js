import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { orgUnitData } from 'common/utils/formComponent.helper';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import LabeledInputs from '../LabeledInput';
import LabeledDropdown from '../DropDown';
import styles from '../OrganizationRegister/organizationRegister.module.scss';
import Button from '../Button';
import LabeledTextarea from '../LabeledTextArea';
import UploadAndPreview from '../UploadAndPreview';
import InputWithCheckbox from '@/components/common/InputWithCheckbox';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import IconLabeledInputs from '../IconLabeledInput';
import { changeHandler } from '@/helper/common.helper';
import useHandleOrgForm from 'common/utils/orgResgisterForm.helper';
import { Country, State, City }  from 'country-state-city';

const OrgUnitForm = ({ setTab = () => {} }) => {
  const [orgTempDetails, setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);
  const [image, setImage] = useState(null);
  const { isUnitFormReady } = useHandleOrgForm();
  const [formData , setFormData] = useState(orgUnitData) ;

  useEffect(async() => {
    if(!orgTempDetails?.orgCountry?.value?.length) return ;
    // if(!orgTempDetails?.orgState?.length) return ;

    //  console.log(orgTempDetails?.orgCountry)
     const state = State.getStatesOfCountry(orgTempDetails?.orgCountry?.countryCode);
     const stateOptions = state?.map((state) => ({value:state?.name , label: state?.name}));
     const formArr = formData ;
     formArr[4].inputOptions.options = stateOptions ;
    //  console.log(formArr);
     setFormData([...formArr]);
     return ;
     
  }, [orgTempDetails?.orgCountry?.value]);


  function handleDropDown(e , state , setState , inputName){
    if(inputName.toLowerCase() === 'orgstate') return setState({...state, [inputName]:e?.value});
    return setState({...state, [inputName]:{value:e?.value ,countryCode: e?.countryCode}});
  }

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
      const file = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      return (
        <UploadAndPreview
          inputOptions={obj?.inputOptions}
          handleChange={setOrgTempDetails}
          uploadedFile={file}
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
    dropDown: function (obj = {}) {
      const data = orgTempDetails[`${obj?.inputOptions?.inputName}`] ;
      let val ;
      if(obj.inputOptions.inputName === 'orgState'){
        val = data
      }
      else {val = data?.value }
      obj.inputOptions.value = { value: val, label: val };
      return (
        <LabeledDropdown
          dropdownOptions={obj?.inputOptions}
          styleClass={styles?.inputStyle}
          changeHandler={(e) =>
            {
            // changeHandler(e, orgTempDetails, setOrgTempDetails, `${obj?.inputOptions?.inputName}`)
            handleDropDown(e, orgTempDetails, setOrgTempDetails, `${obj?.inputOptions?.inputName}`)}
          }
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
      <div className={`${styles?.checkboxContainer}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          name="orgCheckbox"
          changeHandler={(e) => {
            changeHandler(e, orgTempDetails, setOrgTempDetails);
          }}
        />
        <p>
          By checking the box, you are confirming that you have read, understood and agree to our
          <span> privacy policy</span> and <span>terms & conditions</span>.
        </p>
      </div>
      <div className={`${styles?.btnContainer}`}>
        <Button size="small" theme="dark" clickHandler={() => console.log(orgTempDetails)}>
          Cancel
        </Button>
        <Button size="small" clickHandler={() => setTab(2)} isDisabled={isUnitFormReady}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrgUnitForm;
