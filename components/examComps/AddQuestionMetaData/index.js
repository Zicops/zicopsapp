import styles from './addQuestionMetaData.module.scss';
import ZicopsRadioButton from '../../common/ZicopsRadioButton';
import DropdownSelect from '../../Tabs/common/DropdownSelect';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import { InputFieldData } from './Logic/addQuestionMetaData.helper';

const AddQuestionMetaData = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.firstContainer}`}>
        <label>Question Selection:</label>
        <ZicopsRadioButton text={'Existing Question Bank'} />
        <ZicopsRadioButton text={'Upload New'} />
      </div>
      <DropdownSelect
        classes={styles.aqmd_dropdown}
        data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
        inputData={{
          inputName: 'QBank',
          label: 'Question Bank:',
          placeholder: 'Select question Bank',
          value: 'disabled'
        }}
      />
      <div className={`${styles.dropdownContainer}`}>
        <DropdownSelect
          classes={`${styles.aqmd_dropdown} ${styles.aqmd_dropdown2}`}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'QBank',
            label: 'Question Bank:',
            placeholder: 'Select question Bank',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={`${styles.aqmd_dropdown} ${styles.aqmd_dropdown2}`}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'QBank',
            label: 'Question Bank:',
            placeholder: 'Select question Bank',
            value: 'disabled'
          }}
        />
      </div>
      <DropdownSelect
        classes={styles.aqmd_dropdown}
        data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
        inputData={{
          inputName: 'QBank',
          label: 'Difficulty:',
          placeholder: 'Select question Bank',
          value: 'disabled'
        }}
      />
      <div className={`${styles.inputsContainer}`}>
        <InputField obj={InputFieldData[0]} />
        <InputField obj={InputFieldData[1]} />
      </div>
      <div className={`${styles.inputContainer}`}>
        <InputField obj={InputFieldData[2]} />
      </div>
      <div className={`${styles.firstContainer}`}>
        <label>Question Selection:</label>
        <ZicopsRadioButton text={'Existing Question Bank'} />
        <ZicopsRadioButton text={'Upload New'} />
      </div>
      <div className={`${styles.btnContainer}`}>
        <Button text={'Back'} />
        <Button text={'Next'} />
      </div>
    </div>
  );
};

export default AddQuestionMetaData;
