import { useState } from 'react';
import TabContainer from '../../common/TabContainer';
import SelectExistingUser from './SelectExistingUser.js';
import InviteNewTrainer from './InviteNewTrainer.js';
import AddTrainingExpertise from './AddTrainingExpertise';
import styles from './../trainingComps.module.scss';

export default function AddTrainerPopup() {
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
    </>
  );
}
