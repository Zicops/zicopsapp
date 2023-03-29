import Button from '@/components/common/Button';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import AddExpertise from './AddExpertise';
import styles from './addTrainer.module.scss';
const ExistingUser=()=>
{
    return(
        <div className={`${styles.existingUserContainer}`}>
       <div className={`${styles.selectUser}`}>
        <p>Select user:</p>
        <LabeledDropdown
        dropdownOptions={{
          inputName: 'select user',
          placeholder: 'Select user',
        //   options: [],
        //   value: courseMetaData?.subCategory
        //     ? { value: courseMetaData?.subCategory, label: courseMetaData?.subCategory }
        //     : null,
        //   isDisabled: true
        }}
        // isFullWidth={true}
        styleClass={`${styles.selectUserInput}`}
      />
       </div>

       <AddExpertise/>
       <div className={`${styles.inviteTrainerBtns}`}>
          <Button
            text="Cancel"
            // clickHandler={toggleResourceForm}
            // styleClass={styles.topicContentSmallBtn}
          />
          <Button
            text="Save"
            // clickHandler={toggleResourceForm}
            styleClass={styles.inviteTrainerSendBtn}
          />
            <Button
            text="Save & Add more"
            // clickHandler={toggleResourceForm}
            styleClass={styles.inviteTrainerSendBtn}
          />
        </div>
        </div>
    )
};
export default ExistingUser;