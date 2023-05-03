import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown/index.js';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput.js';
import { useState, useEffect } from 'react';
import { userOptions } from '../trainingManagement.helper.js';
import styles from './../trainingComps.module.scss';
import { useRecoilState } from 'recoil';
import { TrainerDataAtom } from '@/state/atoms/trainingManagement.atoms.js';

export default function InviteNewTrainer() {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);

  const [emails, setEmails] = useState([]);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const _trainerData = structuredClone(trainerData);
    _trainerData.inviteEmails = emails?.[0]?.props?.children?.[0];
    setTrainerData(_trainerData);
  }, [emails]);

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
                label: trainerData?.tag,
                value: trainerData?.tag
              },
              options: userOptions
              //   isDisabled: isViewPage
            }}
            changeHandler={(e) => setTrainerData((prev) => ({ ...prev, tag: e.value }))}
            styleClass={styles.dropDownMain}
            hideSelectedOptions={false}
          />
        </div>
        <div className={`${styles.email}`}>
          <label>Email: </label>
          <MultiEmailInput
            items={emails}
            setItems={setEmails}
            isDisabled={emails?.length === 1}
            type={trainerData?.tag}
          />
        </div>
      </div>
    </div>
  );
}
