import styles from './uploadNewQuestionBank.module.scss';
import InputField from '../../common/InputField';
import DropdownSelect from '../../Tabs/common/DropdownSelect';
import { obj } from './Logic/uploadNewQuestionBank.helper.js';
import UploadQuestions from '../UploadQuestions';
import Button from '../../common/Button';

const UploadNewQuestionBank = ({ text }) => {
  return (
    <div className={`${styles.container}`}>
      <InputField obj={obj[0]} />
      <InputField obj={obj[1]} />
      <div className={`${styles.dropdownContainer}`}>
        <DropdownSelect
          classes={`${styles.aqmd_dropdown} ${styles.aqmd_dropdown2}`}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'QBank',
            label: 'Category:',
            placeholder: 'Select question Bank',
            value: 'disabled'
          }}
        />
        <DropdownSelect
          classes={`${styles.aqmd_dropdown} ${styles.aqmd_dropdown2}`}
          data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
          inputData={{
            inputName: 'QBank',
            label: 'Sub Category:',
            placeholder: 'Select question Bank',
            value: 'disabled'
          }}
        />
      </div>
      <div className={`${styles.uqContainer}`}>
        <UploadQuestions />
      </div>
      <div className={`${styles.uqFooter}`}>
        <div className={`${styles.leftBox}`}>Current Status:{text}</div>
        <div className={`${styles.rightBox}`}>
          <a>View Statistics</a>
          <Button text={'Cancel'} />
          <Button text={'Add'} />
        </div>
      </div>
    </div>
  );
};

export default UploadNewQuestionBank;
