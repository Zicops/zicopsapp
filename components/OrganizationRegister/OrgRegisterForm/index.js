import Dropdown from 'common/components/DropDown';
import PhoneInputBox from '@/components/common/FormComponents/PhoneInputBox';
import Button from 'common/components/Button';
import LabeledInputs from 'common/components/LabeledInput';
import { orgInputData } from '../helper/orgRegister.helper';
import styles from '../organizationRegister.module.scss';
import { useRecoilState } from 'recoil';
import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { changeHandler } from '@/helper/common.helper';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledTextarea from 'common/components/LabeledTextarea';
import UploadAndPreview from 'common/components/UploadAndPreview';
import { useEffect, useState } from 'react';

const OrgRegisterForm = () => {
  const [orgTempDetails, setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setOrgTempDetails({ ...orgTempDetails, orgLogo: image });
    return;
  }, [image]);

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
    phoneInput: function (obj = {}) {
      return <PhoneInputBox />;
    },
    uploadInput: function (obj = {}) {
      const file = orgTempDetails[`${obj?.inputOptions?.inputName}`] ;
      return <UploadAndPreview inputOptions={obj?.inputOptions} handleChange={setImage}
      uploadedFile={file}/>
    },
    dropDown: function (obj = {}) {
      const val = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      obj.inputOptions.value = { value: val, label: val };
      return (
        <Dropdown
          dropdownOptions={obj?.inputOptions}
          styleClass={styles?.inputStyle}
          changeHandler={(e) =>
            changeHandler(e, orgTempDetails, setOrgTempDetails, `${obj?.inputOptions?.inputName}`)
          }
        />
      );
    },
    textAreaInput: function (obj = {}) {
      obj.inputOptions.value = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      return <LabeledTextarea inputOptions={obj?.inputOptions}
      styleClass={styles?.inputStyle}
      changeHandler={(e) => {
        changeHandler(e, orgTempDetails, setOrgTempDetails);
      }}/>
    }
  };
  return (
    <div className={`${styles?.orgRegisterContainer}`}>
      {orgInputData?.map((form) => {
        return <>{INPUT_OBJECT[`${form?.type}`](form)}</>;
      })}
      <div className={`${styles?.btnContainer}`}>
      <Button size='small' theme='dark'>Cancel</Button>
      <Button clickHandler={()=>{console.log(orgTempDetails,'org data')}}>Submit</Button></div>
    </div>
  );
};

export default OrgRegisterForm;
