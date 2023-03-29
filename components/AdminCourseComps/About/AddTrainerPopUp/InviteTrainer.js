import Button from '@/components/common/Button';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import AddExpertise from './AddExpertise';
import styles from './addTrainer.module.scss';
const InviteTrainer = () => {
  return (
    <>
      <div className={`${styles.invitetrainerContainer}`}>
        <div className={`${styles.userType}`}>
          <div>
            <p>User type :</p>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'select user',
                placeholder: 'Internal'
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
          <div className={`${styles.emailInputs}`}>
            <p>Email:</p>
            <LabeledInput
              inputOptions={{
                inputName: 'email',
                placeholder: 'Type email ID and press enter'
                //   isNumericOnly: true,
                //   value: +courseMetaData?.expectedCompletion || null,
                //   isDisabled: isDisabled
              }}
              styleClass={`${styles.emailInput}`}
              // changeHandler={(e) => handleChange({ expectedCompletion: e?.target?.value || null })}
            />
          </div>
        </div>

        <AddExpertise />
        <div className={`${styles.inviteTrainerBtns}`}>
          <Button
            text="Cancel"
            // clickHandler={toggleResourceForm}
            styleClass={styles.topicContentSmallBtn}
          />
          <Button
            text="Send Invite"
            // clickHandler={toggleResourceForm}
            styleClass={styles.inviteTrainerSendBtn}
          />
        </div>
      </div>
    </>
  );
};
export default InviteTrainer;
