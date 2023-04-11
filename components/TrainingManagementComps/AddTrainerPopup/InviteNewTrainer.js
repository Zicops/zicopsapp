import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown/index.js';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput.js';
import { useState } from 'react';
import { userOptions } from '../trainingManagement.helper.js';
import styles from './../trainingComps.module.scss';

export default function InviteNewTrainer() {
  const [emails, setEmails] = useState([]);
  const [userType, setUserType] = useState('');

  return (
    <div>
      <div className={`${styles.userTypeAndEmail}`}>
        <div className={`${styles.userType}`}>
          <label>User Type:</label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'userType',
              placeholder: 'Select User Type',
              value: {
                label: userType,
                value: userType
              },
              options: userOptions
              //   isDisabled: isViewPage
            }}
            changeHandler={(e) => setUserType(e.value)}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.email}`}>
          <label>Email: </label>
          <MultiEmailInput
            items={emails}
            setItems={setEmails}
            // isDisabled={
            //   isViewPage || isVendor || (isDev ? false : isIndividualVendor && emails?.length)
            // }
          />
        </div>
      </div>
    </div>
  );
}
