import { useState, useEffect } from 'react';
import TabContainer from '../../common/TabContainer';
import SelectExistingUser from './SelectExistingUser.js';
import InviteNewTrainer from './InviteNewTrainer.js';
import AddTrainingExpertise from './AddTrainingExpertise';
import styles from './../trainingComps.module.scss';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import Button from '@/components/common/Button';
import useHandleTrainerData from '../Logic/useHandleTrainerData';

export default function AddTrainerPopup({ popUpState = [] }) {
  const { addUpdateTrainer, handleMail } = useHandleTrainerData();

  const tabData = [
    {
      name: 'Selecting Exisitng User ',
      component: <SelectExistingUser />
    },
    {
      name: 'Invite New Trainer',
      component: <InviteNewTrainer />
    }
  ];

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <VendorPopUp title="Add Trainer" popUpState={popUpState} size="large" isFooterVisible={false}>
        <TabContainer
          tabData={tabData}
          tab={tab}
          setTab={setTab}
          footerObj={{
            showFooter: false
          }}
          customStyles={{ backgroundColor: 'transparent', height: 'auto', overflow: 'unset' }}
        />
        <div className={`${styles.addTrainingExpertiseContainer}`}>
          <AddTrainingExpertise />
        </div>

        <div className={`${styles.footerButton}`}>
          <Button text={'Cancel'} />
          <Button
            text={'Save'}
            clickHandler={() => {
              addUpdateTrainer(tab === tabData[0].name);
              handleMail(tab === tabData[1].name);
            }}
          />
          <Button text={'Save & Add More'} />
        </div>
      </VendorPopUp>
    </>
  );
}
