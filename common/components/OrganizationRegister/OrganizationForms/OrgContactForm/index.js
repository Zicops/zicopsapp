import { changeHandler , isEmail} from '@/helper/common.helper';
import { OrganizationDetailsAtom , getOrgsTempDetails } from '@/state/atoms/organizations.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import useHandleOrgForm from 'common/components/OrganizationRegister/utils/orgResgisterForm.helper';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { orgContactPersonData } from '../../helper/orgRegister.helper';
import OrgCongratulations from 'common/components/OrgCongratulations';
import Button from 'common/components/Button';
import LabeledDropdown from 'common/components/DropDown';
import IconLabeledInputs from 'common/components/IconLabeledInput';
import LabeledInputs from 'common/components/LabeledInput';
import LabeledTextarea from 'common/components/LabeledTextArea';
import styles from '../../organizationRegister.module.scss';
import OrgPhoneInput from 'common/components/OrgPhoneInput';
import { useRouter } from 'next/router';
// import OrgPhoneInput from '../OrgPhoneInput';

const OrgContactForm = ({ setTab = () => {} }) => {
  const [orgTempDetails, setOrgTempDetails] = useRecoilState(OrganizationDetailsAtom);
  const { isContactFormReady, handleContactPersonForm , isButtonDisable } = useHandleOrgForm();
  const [formData, setFormData] = useState(orgContactPersonData);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (orgTempDetails?.orgPersonRole?.toLowerCase() !== 'others')
      return setFormData(orgContactPersonData);
    if (formData?.length === 8) return;
    const formInput = {
      type: 'normalInput',
      inputOptions: {
        placeholder: 'Enter organizational role',
        inputName: 'orgPersonRoleOthers',
        label: 'Please specify others :'
      }
    };
    const data = [...orgContactPersonData];
    data?.splice(orgContactPersonData?.length - 2, 0, formInput);
    // console.log('ipdae',orgContactPersonData,data)
    setFormData([...data]);
    return;
  }, [orgTempDetails]);

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
          icon={isEmail(obj.inputOptions.value)}
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
          clickHandler={async () => {
            const res = await handleContactPersonForm();
            if (!res) {
              return setToastMsg({ type: 'danger', message: 'Error while filling the form!' });
            }
            setIsFormSubmit(true);
          }}
          isDisabled={!isContactFormReady || isButtonDisable}>
          Submit
        </Button>
      </div>
      {isFormSubmit && (
        <OrgCongratulations
          title={null}
          shape={'square'}
          clickHandle={() => {
            router.push('/home');
            setOrgTempDetails(getOrgsTempDetails({}));
          }}
        />
      )}
    </div>
  );
};

export default OrgContactForm;
