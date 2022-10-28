import PhoneInputBox from '@/components/common/FormComponents/PhoneInputBox';
import { changeHandler } from '@/helper/common.helper';
import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import Button from 'common/components/Button';
import Dropdown from 'common/components/DropDown';
import LabeledInputs from 'common/components/LabeledInput';
import LabeledTextarea from 'common/components/LabeledTextarea';
import useHandleOrgForm from 'common/components/OrganizationRegister/utils/orgResgisterForm.helper';
import OrgCongratulations from 'common/components/OrgCongratulations';
import UploadAndPreview from 'common/components/UploadAndPreview';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { orgRegisterData } from '../../helper/orgRegister.helper';
import styles from '../../organizationRegister.module.scss';

const OrgRegisterForm = () => {
  const [orgTempDetails, setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);
  // const [image, setImage] = useState(null);
  const { isOrgRegisterationReady , handleOrgRegisterForm } = useHandleOrgForm();
  const [isFormSubmit , setIsFormSubmit] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   setOrgTempDetails({ ...orgTempDetails, orgLogo: image });
  //   return;
  // }, [image]);

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
      const file = orgTempDetails[`${obj?.inputOptions?.inputName}`];
      return (
        <UploadAndPreview
          inputOptions={obj?.inputOptions}
          handleChange={setOrgTempDetails}
          uploadedFile={file}
        />
      );
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
      {orgRegisterData?.map((form) => {
        return <>{INPUT_OBJECT[`${form?.type}`](form)}</>;
      })}
      <div className={`${styles?.btnContainer}`}>
        <Button size="small" theme="dark">
          Cancel
        </Button>
        <Button
          clickHandler={async() => {
            console.log(orgTempDetails, 'org data');

            const res = await handleOrgRegisterForm()
           
            setIsFormSubmit(true);

          }}
          isDisabled={!isOrgRegisterationReady}>
          Submit
        </Button>
      </div>
      {isFormSubmit&&(<OrgCongratulations title={'Organization created sccessfully!'} shape={'square'} clickHandle={()=>{router.push('/create-learning-space/org-unit-form')}}/>)}
    </div>
  );
};

export default OrgRegisterForm;
