import InputField from '../../common/InputField';
import { Data } from './Logic/addCustomSection.helper';
import DropdownSelect from '../../Tabs/common/DropdownSelect';
import styles from './addCustomSection.module.scss';
import Button from '../../common/Button';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';

const items = [
  { label: 'Accounting', value: 'Accounting' },
  { label: 'Bussiness', value: 'Bussiness' },
  { label: 'Developement', value: 'Developement' },
  { label: 'Engineering', value: 'Engineering' },
];

const dropdownOptions = {
  inputName: 'QBank',
  label: 'Section Type:',
  placeholder: 'Select section type',
  options: items,
  isMulti: false,
  isDisabled: false,
  isSearchEnable: false
};

const AddCustomSection = () => {
  return (
    <>
      {/* <InputField obj={Data[0]} />
      <InputField obj={Data[1]} /> */}
      <LabeledInput
        inputOptions={{
          inputName: 'sectionName',
          label: 'Section Name',
          placeholder: 'Enter section name in less than 60 characters',
          maxLength: 60
        }}
      />
      <LabeledInput
        inputOptions={{
          inputName: 'sectionDescription',
          label: 'Description',
          placeholder: 'Enter description in less than 160 characters',
          maxLength: 60
        }}
      />
      {/* <LabeledDropdown dropdownOptions={dropdownOptions} /> */}
      <DropdownSelect
        classes={styles.acs_dropdown}
        data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
        inputData={{
          inputName: 'QBank',
          label: 'Question Bank:',
          placeholder: 'Select question Bank',
        }}
      />
      <div className={`${styles.bt_Container}`}>
        <Button text={'Cancel'} />
        <Button text={'Save'} />
      </div>
    </>
  );
};

export default AddCustomSection;
