import Button from '@/components/common/Button';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { AddTrainerPopUpAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddExpertise from './AddExpertise';
import styles from './addTrainer.module.scss';
const InviteTrainer = () => {
  const [userType, setUserType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const typesOfUser = [
    { label: 'Internal', value: 'Internal' },
    { label: 'external', value: 'external' }
  ];
  const[addTrainerAtom,setAddtrainerAtom]=useRecoilState(AddTrainerPopUpAtom)
  return (
    <>
      <div className={`${styles.invitetrainerContainer}`}>
        <div className={`${styles.userType}`}>
          <div>
            <p>User type :</p>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'select user',
                placeholder: 'Internal',
                options: typesOfUser,
                value: { label: userType, value: userType }
              }}
              styleClass={`${styles.selectUserInput}`}
              changeHandler={(e) => {
                setUserType(e?.value);
              }}
            />
          </div>
          <div className={`${styles.emailInputs}`}>
            <p>Email:</p>
            <LabeledInput
              inputOptions={{
                inputName: 'email',
                placeholder: 'Type email ID and press enter',
                value: userEmail,
              }}
              changeHandler={(e) => 
              {
                setUserEmail(e.target.value)
              }}
               styleClass={`${styles.emailInput}`}
            />
          </div>
        </div>

        <AddExpertise title={'InviteTrainer'}/>
        <div className={`${styles.inviteTrainerBtns}`}>
          <Button
            text="Cancel"
            // clickHandler={toggleResourceForm}
            styleClass={styles.topicContentSmallBtn}
          />
          <Button
            text="Send Invite"
            clickHandler={()=>
            {
              console.info(addTrainerAtom.InviteTrainer)
            }}
            styleClass={styles.inviteTrainerSendBtn}
          />
        </div>
      </div>
    </>
  );
};
export default InviteTrainer;
