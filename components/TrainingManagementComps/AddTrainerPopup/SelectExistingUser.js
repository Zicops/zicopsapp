import useHandleCourseData from '@/components/AdminCourseComps/Logic/useHandleCourseData.js';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown/index.js';
import { useEffect, useState } from 'react';
import styles from './../trainingComps.module.scss';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useRecoilState } from 'recoil';
import { TrainerDataAtom } from '@/state/atoms/trainingManagement.atoms';

export default function SelectExistingUser() {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);
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
      userId: user?.id,
      photo: user?.photo_url
    };
  }

  let trainers = trainerCandidates?.map(getUserListObject);
  return (
    <div>
      <div>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'Trainers',
            placeholder: 'Select User',
            label: 'Select User :',
            isSearchEnable: true,
            menuPlacement: 'bottom',
            options: trainers?.map((trainee, index) => ({
              label: (
                <div className={`${styles.trainerOptions}`}>
                  {/*<div>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      changeHandler={handleExpertiseSelection}
                      value={trainee.name}
                    />
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
              value: trainee.userId,
              ...trainee
            })),
            value: {
              label: `${trainerData?.name || ''} (${trainerData?.email || ''}) - ${
                trainerData?.tags || 'Internal'
              }`,
              value: trainerData?.name
            }
          }}
          isFullWidth={true}
          changeHandler={(e) =>
            setTrainerData((prev) => ({
              ...prev,
              userId: e.userId,
              name: e.name,
              email: e.email,
              photo: e.photo
            }))
          }
          isLoading={trainerCandidates == null}
          isColumnWise={true}
          customDropdownStyles={customDropdownStyleObj}
        />
      </div>
    </div>
  );
}
