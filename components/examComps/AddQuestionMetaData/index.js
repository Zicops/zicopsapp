import styles from './addQuestionMetaData.module.scss';
import ZicopsRadioButton from '../../common/ZicopsRadioButton';
import DropdownSelect from '../../Tabs/DropdownSelect';
import Button from '../../common/Button';

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
      <div className={`${styles.dropdownContainer}`}>
        <DropdownSelect
          classes={`${styles.aqmd_dropdown} ${styles.aqmd_dropdown2}`}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'QBank',
            label: 'Marks per question:',
            placeholder: 'Select question Bank',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={`${styles.aqmd_dropdown} ${styles.aqmd_dropdown2}`}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'QBank',
            label: 'No. of Question:',
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
          label: 'Total Marks:',
          placeholder: 'Select question Bank',
          value: 'disabled'
        }}
      />
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
