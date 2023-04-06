import Button from '@/components/common/Button';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { AddTrainerPopUpAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddExpertise from './AddExpertise';
import styles from './addTrainer.module.scss';
const ExistingUser=()=>
{
  const [userName,setUserName]=useState('')
  const userList =[
    {label :"sandeep",value:"sandeep"},
    {label:"xyz",value:"xyz"}
  ]
  const[addTrainerAtom,setAddtrainerAtom]=useRecoilState(AddTrainerPopUpAtom)
    return(
        <div className={`${styles.existingUserContainer}`}>
       <div className={`${styles.selectUser}`}>
        <p>Select user:</p>
        <LabeledDropdown
        dropdownOptions={{
          inputName: 'select user',
          placeholder: 'Select user',
          options: userList,
          value: {label:userName,value:userName}
        }}
        // isFullWidth={true}
        styleClass={`${styles.selectUserInput}`}
        changeHandler={(e)=>
        {
          setUserName(e?.value)
        }}
      />
       </div>

       <AddExpertise title="ExistingUser" />
       <div className={`${styles.inviteTrainerBtns}`}>
          <Button
            text="Cancel"
            // clickHandler={toggleResourceForm}
            // styleClass={styles.topicContentSmallBtn}
          />
          <Button
            text="Save"
            clickHandler={()=>
            {
              console.info(addTrainerAtom.ExistingUserArr)
            }}
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