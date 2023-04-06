import styles from './addTrainer.module.scss';
import PopUp from '@/common/PopUp';
import TabContainer from '@/components/common/TabContainer';
import { useState } from 'react';
import ExistingUser from './ExistingUser';
import InviteTrainer from './InviteTrainer';
const AddTrainerPopUp = ({ showPopUp, setShowPopUp }) => {
  const Tabs = [
    {
      name: 'Select Existing User',
      component: <ExistingUser/>
    },
    {
      name: 'Invite New Trainer',
      component: <InviteTrainer/>
    }
  ];
  const Obj = {
    comp1: { name: 'Select Existing User', component: <ExistingUser/> },
    comp2: { name: 'Invite New Trainer', component: <InviteTrainer/> }
  };
 const style={
    overflow:"hiddin"
 }
  const [tab, setTab] = useState(Obj?.comp1.name);
  return (
    <PopUp
      customStyles={style}
      size="large"
      open={showPopUp}
      popUpState={[showPopUp, setShowPopUp]}
      isFooterVisible={false}>
      <div className={`${styles.popupContainer}`}>
        <div className={`${styles.addtrainerHead}`}>
          <div>
            <h4>Add Trainer</h4>
            <p>Selected user can be added as Trainer and will be mapped to Classroom Trainings</p>
          </div>
        </div>
        <TabContainer
          footerObj={{ showFooter: false }}
          customClass={`${styles.tabContainer}`}
          tabData={Tabs}
          tab={tab}
          setTab={setTab}
        />
      </div>
    </PopUp>
  );
};
export default AddTrainerPopUp;
