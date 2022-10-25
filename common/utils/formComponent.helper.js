import styles from '../../components/OrganizationRegister/organizationRegister.module.scss';

// labeled dropdown react multi select styles
export function customSelectStyles(
  isFiftyFifty = false,
  containerWidth = '100%',
  isError,
  isReadonly
) {
  return {
    container: (provided, state) => ({
      ...provided,
      width: isFiftyFifty ? '50%' : containerWidth,
      boxShadow: state?.isFocused ? '0px 0px 10px 0px var(--primary)' : 'none'
    }),
    control: (provided, state) => {
      let borderStyle = '2px solid var(--dark_three)';

      if (state?.isFocused || state?.hasValue) borderStyle = '2px solid var(--primary)';
      if (state?.isDisabled) borderStyle = '2px solid var(--dark_three)';
      if (isError) borderStyle = '2px solid var(--error)';
      if (isReadonly) borderStyle = 'none';

      return {
        ...provided,
        backgroundColor: 'var(--dark_two)',
        border: borderStyle,
        borderRadius: 0,
        boxShadow: 'none',
        fontSize: '14px',
        '&:hover': {
          borderWidth: '2px'
        }
      };
    },
    input: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none !important'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: isReadonly ? 'none' : ''
      }
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
      borderRadius: 0,
      maxHeight: '200px',
      /* width */
      '&::-webkit-scrollbar': {
        width: '5px',
        borderRadius: '0px',
        cursor: 'pointer'
      },
      /* Track */
      '&::-webkit-scrollbar-track': {
        background: '#2a2e31',
        borderRadius: '7px'
      },
      /* Handle */
      '&::-webkit-scrollbar-thumb': {
        background: '#969a9d',
        borderRadius: '7px',
        /* Handle on hover */
        '&:hover': {
          background: '#555'
        }
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state?.isFocused ? 'var(--black)' : 'var(--popup-bg-color)',
      color: state?.isSelected ? 'var(--white)' : 'var(--dark_three)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--black)',
        color: 'var(--white)'
      }
    }),
    singleValue: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--primary)'
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      fontSize: '14px',
      padding: '5px'
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--primary)'
      }
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      borderRadius: '0',
      backgroundColor: 'var(--popup-bg-color)',
      color: 'var(--dark_three)',
      fontSize: '14px'
    })
  };
}

export const industriesOption = [
  { label: 'Software', value: 'Software' },
  { label: 'Financial Services', value: 'Financial Services' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'HealthCare', value: 'HealthCare' },
  { label: 'Bussiness Services', value: 'Bussiness Services' },
  { label: 'Rental', value: 'Rental' },
  { label: 'Hospitality', value: 'Hospitality' },
  { label: 'Telecomminication', value: 'Telecomminication' },
  { label: 'Others', value: 'Others' }
];

export const bussinessTypeOption = [
  { label: 'Small Business(1-50)', value: 'Small Business' },
  { label: 'Mid size', value: 'Mid size' },
  { label: 'Business(50-250)', value: 'Business(50-250)' },
  { label: 'Enterprise(250-500)', value: 'Enterprise(250-500)' },
  { label: 'Enterprise', value: 'Enterprise' },
  { label: 'Plus(+500)', value: 'Plus(500+)' }
];

export const numberEmployessOption = [
  { label: '1-10', value: '1-10' },
  { label: '11-50', value: '11-50' },
  { label: '50-100', value: '50-100' },
  { label: '101-500', value: '101-500' },
  { label: '501-1000', value: '501-1000' },
  { label: '1001-5000', value: '1001-5000' },
  { label: '5001+', value: '5001+' }
];

export const formType = {
  normalInput: 'normalInput',
  phoneInput: 'phoneInput',
  uploadInput: 'uploadInput',
  dropDown: 'dropDown',
  textArea: 'textAreaInput',
  iconInput: 'iconInput'
};

export const orgUnitData = [
  {
    type: formType?.iconInput,
    inputOptions: {
      placeholder: 'Enter organization name',
      inputName: 'orgName',
      label: 'Organization name :',
      maxLength: 60
    },
    iconType: true
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter organization unit name',
      inputName: 'orgUnitName',
      label: 'Organization unit name :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.textArea,
    inputOptions: {
      placeholder: 'Enter your organization’s postal adress',
      inputName: 'orgPostalAddress',
      label: 'Postal address :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select country',
      inputName: 'orgCountry',
      label: 'Country* :',
      options: industriesOption
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select state',
      inputName: 'orgState',
      label: 'State* :',
      options: industriesOption
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Select city',
      inputName: 'orgCity',
      label: 'City* :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter postal-code',
      inputName: 'orgPostalCode',
      label: 'Postal-code* :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select number of employees',
      inputName: 'orgEmployees',
      label: 'Number of employees* :',
      options: numberEmployessOption
    }
  },
  {
    type: formType?.uploadInput,
    inputOptions: {
      placeholder: 'Upload Photo',
      inputName: 'orgUnitLogo',
      label: 'Organization unit logo* :'
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter learning space name',
      inputName: 'orgLearningSpaceName',
      label: 'Learning space name* :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.iconInput,
    inputOptions: {
      placeholder: 'Enter learning space URL preference',
      inputName: 'orgLearningSpaceUrl',
      label: 'Learning space URL preference* :',
      maxLength: 60
    },
    iconType: '.zicops.com'
  },
  {
    type: formType?.uploadInput,
    inputOptions: {
      placeholder: 'Upload Photo',
      inputName: 'orgProfilePhoto',
      label: 'Learning space profile* :'
    }
  }
];

export const orgContactPersonData = [
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter firstname',
      inputName: 'orgPersonFirstname',
      label: 'First name :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter lastname',
      inputName: 'orgPersonLastname',
      label: 'Last name :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.iconInput,
    inputOptions: {
      placeholder: 'Enter email id',
      inputName: 'orgPersonEmailId',
      label: 'Email id :'
    },
    iconType: true
  },
  {
    type: formType?.phoneInput,
    inputOptions: {
      placeholder: '000 000 0000',
      inputName: 'orgPersonContactNumber',
      label: 'Contact number :'
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select role in the organization',
      inputName: 'orgPersonRole',
      label: 'Organization role :',
      options: industriesOption
    }
  },
  // {
  //      type: 'normalInput',
  //      inputOptions: {
  //        placeholder: 'Enter organizational role',
  //        inputName: 'orgPersonRoleOthers',
  //        label: 'Please specify others :'
  //       }
  //     },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter your organization LinkedIn URL',
      inputName: 'orgLinkdInUrl',
      label: 'LinkedIn :'
    }
  },

  {
    type: formType?.textArea,
    inputOptions: {
      placeholder: 'Enter your remarks (purpose)',
      inputName: 'orgPersonRemarks',
      label: 'Remarks (Purpose) :'
    },
    styleClass: styles?.inputStyle
  }
];
