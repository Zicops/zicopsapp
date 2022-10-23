import styles from '../organizationRegister.module.scss';

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
  textArea: 'textAreaInput'
};

export const orgInputData = [
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter organization name',
      inputName: 'orgName',
      label: 'Organization name :',
      maxLength: 60
    },
    styleClass: styles?.inputStyle
  },
  {
    type: formType?.uploadInput,
    inputOptions: {
      placeholder: 'Organization Logo',
      inputName: 'orgLogo',
      label: 'Organization logo* :'
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select Industry',
      inputName: 'orgIndustry',
      label: 'Industry* :',
      options: industriesOption
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select type',
      inputName: 'orgType',
      label: 'Type* :',
      options: bussinessTypeOption
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select number of employees',
      inputName: 'orgEmployees',
      label: 'Number of employees :',
      options: numberEmployessOption
    }
  },
  {
    type: formType?.normalInput,
    inputOptions: {
      placeholder: 'Enter your organization website URL',
      inputName: 'orgUrl',
      label: 'Website* :',
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
