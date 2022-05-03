import InputField from '../../common/InputField';
import { Data } from './Logic/addCustomSection.helper';
import DropdownSelect from '../../Tabs/common/DropdownSelect';
import styles from './addCustomSection.module.scss';
import Button from '../../common/Button';

const AddCustomSection = () => {
  return (
    <>
      <InputField obj={Data[0]} />
      <InputField obj={Data[1]} />

      <DropdownSelect
        classes={styles.acs_dropdown}
        data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
        inputData={{
          inputName: 'QBank',
          label: 'Question Bank:',
          placeholder: 'Select question Bank',
          value: 'disabled'
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
