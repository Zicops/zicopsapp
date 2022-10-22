import styles from '../organizationRegister.module.scss' ;

export const industriesOption = [
    {label: 'Software' , value: 'Software'},
    {label: 'Financial Services' , value: 'Financial Services'},
    {label: 'Manufacturing' , value: 'Manufacturing'},
    {label: 'HealthCare' , value: 'HealthCare'},
    {label: 'Bussiness Services' , value: 'Bussiness Services'},
    {label: 'Rental' , value: 'Rental'},
    {label: 'Hospitality' , value: 'Hospitality'},
    {label: 'Telecomminication' , value: 'Telecomminication'},
    {label: 'Others' , value: 'Others'},
]



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
    } ,
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
      options:industriesOption
    }
  },
  {
    type: formType?.dropDown,
    inputOptions: { placeholder: 'Select type', inputName: 'orgType', label: 'Type* :' }
  },
  {
    type: formType?.dropDown,
    inputOptions: {
      placeholder: 'Select number of employees',
      inputName: 'orgEmployess',
      label: 'Number of employees :'
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
