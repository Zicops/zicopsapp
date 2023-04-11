import useHandleCourseData from '@/components/AdminCourseComps/Logic/useHandleCourseData.js';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown/index.js';
import { useEffect, useState } from 'react';
import styles from './../trainingComps.module.scss';

export default function SelectExistingUser() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState([]);
  const { getTrainersAndModerators, trainerCandidates } = useHandleCourseData();

  useEffect(() => {
    if (trainerCandidates?.length) return;

    getTrainersAndModerators().catch((err) => console.log(err));
  }, []);

  const customDropdownStyleObj = {
    placeholderStyles: { color: '#747474' },
    optionStyles: {
      background: 'var(--black)',
      color: 'var(--white)',
      '&:hover': {
        background: styles.darkTwo
      }
    }
  };

  function getUserListObject(user) {
    return {
      name: user?.full_name,
      isSelected: false,
      email: user?.email,
      user_id: user?.id,
      photo: user?.photo_url
    };
  }

  let trainers = trainerCandidates?.map(getUserListObject);
  return (
    <div>
      <div>
        <label>Select User:</label>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'Trainers',
            placeholder: 'Select User',
            isSearchEnable: true,
            menuPlacement: 'bottom',
            isMulti: true,
            options: trainers?.map((trainee, index) => ({
              label: (
                <div className={`${styles.trainerOptions}`}>
                  {/*<div>
                <LabeledRadioCheckbox type="checkbox" />
              </div>*/}
                  <div className={`${styles.trainerImage}`}>
                    <img src={trainee.photo} />
                  </div>
                  <div className={`${styles.nameEmailTrainer}`}>
                    <p>{trainee.name}</p>
                    <p className={`${styles.email}`}>{trainee.email}</p>
                  </div>
                </div>
              ),
              value: trainee.name,
              ...trainee
            }))
            // options: Trainers?.map((trainee) => ({ label: trainee, value: trainee })),
            // value: !!classroomMaster?.trainers?.length
            //   ? classroomMaster?.trainers?.map((trainee) => ({
            //       label: trainee?.value,
            //       value: trainee?.value,
            //       ...trainee
            //     }))
            //   : null,
            // isDisabled: isDisabled
          }}
          isFullWidth={true}
          changeHandler={(e) => setUsername(e.value)}
          isLoading={trainerCandidates == null}
          customDropdownStyles={customDropdownStyleObj}
        />
      </div>
    </div>
  );
}
