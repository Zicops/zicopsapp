import { useState, useEffect } from 'react';
import TabContainer from '../../common/TabContainer';
import SelectExistingUser from './SelectExistingUser.js';
import InviteNewTrainer from './InviteNewTrainer.js';
import AddTrainingExpertise from './AddTrainingExpertise';
import styles from './../trainingComps.module.scss';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import Button from '@/components/common/Button';
import useHandleTrainerData from '../Logic/useHandleTrainerData';
import { useRecoilState } from 'recoil';
import { TrainerDataAtom, getTrainerDataObj } from '@/state/atoms/trainingManagement.atoms';
import TrainingProfileAccordian from './TrainingProfileAccordian';

export default function AddTrainerPopup({
  popUpState = [],
  isEdit = false,
  isView = false,
  individualTrainerData = null,
}) {
  const { addUpdateTrainer, handleMail } = useHandleTrainerData();
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);

  const tabData = [
    {
      name: 'Select Existing User ',
      component: (
        <SelectExistingUser
          isEdit={isEdit}
          isView={isView}
          individualTrainerData={individualTrainerData}
        />
      ),
    },
    {
      name: 'Invite New Trainer',
      component: <InviteNewTrainer isEdit={isEdit} isView={isView} />,
    },
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <VendorPopUp
        title="Add Trainer"
        popUpState={popUpState}
        size="large"
        isFooterVisible={false}
        headerComps={
          'Selected user can be added as Trainer and will be mapped to Classroom Trainings'
        }>
        <TabContainer
          tabData={tabData}
          tab={tab}
          setTab={setTab}
          footerObj={{
            showFooter: false,
          }}
          customStyles={{ backgroundColor: 'transparent', height: 'auto', overflow: 'unset' }}
        />

        <div className={`${styles.trainingProfile}`}>
          <h3>Training Profile</h3>
          <TrainingProfileAccordian individualTrainerData={individualTrainerData} isView={isView} />
        </div>

        <div className={`${styles.addTrainingExpertiseContainer}`}>
          <AddTrainingExpertise individualTrainerData={individualTrainerData} isView={isView} />
        </div>

        <div className={`${styles.footerButton}`}>
          <Button
            text={'Cancel'}
            clickHandler={(e) => {
              popUpState[1](false);
              setTrainerData(getTrainerDataObj());
            }}
          />
          <Button
            text={
              tab === tabData[0]?.name
                ? individualTrainerData !== null
                  ? 'Update'
                  : 'Save'
                : 'Send Invite'
            }
            clickHandler={(e) => {
              addUpdateTrainer(tab === tabData[0]?.name, isEdit);
              handleMail(tab === tabData[1]?.name);
            }}
            isDisabled={isView}
          />
          {tab === tabData[0]?.name && individualTrainerData === null && (
            <Button
              text={'Save & Add More'}
              clickHandler={async () => {
                await addUpdateTrainer();
                setTrainerData(getTrainerDataObj());
              }}
            />
          )}
        </div>
      </VendorPopUp>
    </>
  );
}
