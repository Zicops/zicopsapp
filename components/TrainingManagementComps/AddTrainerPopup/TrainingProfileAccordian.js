import Accordian from '../../../components/UserProfile/Accordian';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from './../trainingComps.module.scss';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { changeHandler } from '@/helper/common.helper';

export default function TrainingProfileAccordian({ individualTrainerData, isView }) {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);

  useEffect(() => {
    if (individualTrainerData != null)
      setTrainerData((prev) => ({
        ...prev,
        yearsOfExperience: individualTrainerData?.years_of_experience,
        websiteURL: individualTrainerData?.website,
        linkedinURL: individualTrainerData?.linkedin,
        githubURL: individualTrainerData?.github,
        aboutTrainer: individualTrainerData?.description,
      }));
  }, [individualTrainerData]);

  return (
    <div>
      <Accordian height={'auto'} acc_title={'Add About Trainer '}>
        <div className={`${styles.websiteSocialDiv}`}>
          <div className={`${styles.input3}`}>
            <label for="website">Years of Experience: </label>
            <LabeledInput
              inputOptions={{
                inputName: 'yearsOfExperience',
                placeholder: 'Enter years of experience as a trainer',
                maxLength: 60,
                value: trainerData?.yearsOfExperience,
                isDisabled: isView,
              }}
              changeHandler={(e) => changeHandler(e, trainerData, setTrainerData)}
            />
          </div>
          <div className={`${styles.input3}`}>
            <label for="website">Website: </label>
            <LabeledInput
              inputOptions={{
                inputName: 'websiteURL',
                placeholder: 'Enter URL',
                maxLength: 300,
                value: trainerData?.websiteURL,
                isDisabled: isView,
              }}
              changeHandler={(e) => changeHandler(e, trainerData, setTrainerData)}
            />
          </div>
        </div>
        <div className={`${styles.websiteSocialDiv}`}>
          <div className={`${styles.input3}`}>
            <label for="website">LinkedIn: </label>
            <LabeledInput
              inputOptions={{
                inputName: 'linkedinURL',
                placeholder: 'Enter URL',
                maxLength: 300,
                value: trainerData?.linkedinURL,
                isDisabled: isView,
              }}
              changeHandler={(e) => changeHandler(e, trainerData, setTrainerData)}
            />
          </div>
          <div className={`${styles.input3}`}>
            <label for="website">Github: </label>
            <LabeledInput
              inputOptions={{
                inputName: 'githubURL',
                placeholder: 'Enter URL',
                maxLength: 300,
                value: trainerData?.githubURL,
                isDisabled: isView,
              }}
              changeHandler={(e) => changeHandler(e, trainerData, setTrainerData)}
            />
          </div>
        </div>

        <div>
          <LabeledTextarea
            inputOptions={{
              label: 'About the Trainer',
              inputName: 'aboutTrainer',
              placeholder: 'Add Text',
              value: trainerData?.aboutTrainer,
              isDisabled: isView,
            }}
            styleClass={`${styles.aboutTrainer}`}
            changeHandler={(e) => changeHandler(e, trainerData, setTrainerData)}
          />
        </div>
      </Accordian>
    </div>
  );
}
