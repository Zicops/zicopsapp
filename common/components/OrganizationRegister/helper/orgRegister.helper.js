import styles from '../organizationRegister.module.scss';
import { Country } from 'country-state-city';


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


export const COUNTRIES = Country?.getAllCountries()?.map((country) => ({value:country?.name , label:country?.name , countryCode : country?.isoCode}));

export const orgUnitData = [
  {
    type: formType?.iconInput,
    inputOptions: {
      placeholder: 'Enter organization name',
      inputName: 'orgName',
      label: 'Organization name :',
      maxLength: 60
    },
    iconType: 'none'
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
      options: COUNTRIES,
      isSearchEnable: true
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select state',
      inputName: 'orgState',
      label: 'State* :',
      // options: industriesOption.
      noOptionsMessage: 'Select Country First',
      isSearchEnable: true
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
      label: 'First name * :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter lastname',
      inputName: 'orgPersonLastname',
      label: 'Last name * :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.iconInput,
    inputOptions: {
      placeholder: 'Enter email id',
      inputName: 'orgPersonEmailId',
      label: 'Email id * :'
    },
    iconType: true
  },
  {
    type: formType?.phoneInput,
    inputOptions: {
      placeholder: '000 000 0000',
      inputName: 'orgPersonContactNumber',
      label: 'Contact number * :'
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select role in the organization',
      inputName: 'orgPersonRole',
      label: 'Organization role * :',
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

export const orgRegisterData = [
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter organization name',
      inputName: 'orgName',
      label: 'Organization name * :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.uploadInput,
    inputOptions: {
      inputName: 'orgLogo',
      placeholder: 'Organization Logo',
      label: 'Organization logo * :'
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select Industry',
      inputName: 'orgIndustry',
      label: 'Industry * :',
      options: industriesOption
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select type',
      inputName: 'orgType',
      label: 'Type * :',
      options: bussinessTypeOption
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select number of employees',
      inputName: 'orgEmployees',
      label: 'Number of employees:',
      options: numberEmployessOption
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter your organization website URL',
      inputName: 'orgUrl',
      label: 'Website * :',
      maxLength: 60
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter your organization LinkedIn URL',
      inputName: 'orgLinkdInUrl',
      label: 'LinkedIn :',
      maxLength: 60
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter your organization Facebook URL',
      inputName: 'orgFacebookUrl',
      label: 'Facebook :',
      maxLength: 60
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter your organization Twitter URL',
      inputName: 'orgTwitterUrl',
      label: 'Twitter :',
      maxLength: 60
    }
  }
];

