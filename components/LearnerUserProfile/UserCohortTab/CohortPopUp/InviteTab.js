// components\LearnerUserProfile\UserCohortTab\CohortPopUp\InviteTab.js
import styles from '../../learnerUserProfile.module.scss';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import InviteUserLearner from '../InviteUserLearner';
import CheckBoxField from '@/components/common/CheckBoxField';
import { inviteTabData } from '../../Logic/userBody.helper';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';

export default function InviteTab() {
  return (
    <>
      <div className={`${styles.courseTabContainer}`}>
        <div style={{ padding: '0px 5px 15px' }}>
          <SearchBar
            inputDataObj={{
              inputOptions: {
                inputName: 'filter',
                placeholder: 'Search Courses'
              }
            }}
          />
        </div>
        <div className={`${styles.head}`}>
          <LabeledRadioCheckbox type="checkbox" />
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email Id</p>
        </div>
        <div className={`${styles.inviteComponents}`}>
          {inviteTabData?.map((invite) => {
            return <InviteUserLearner inviteTabData={invite} key={invite.id} />;
          })}
        </div>
        <div className={`${styles.addUserBottomContainer}`}>
          <div className={`${styles.leftSide}`}>
            Users selected: <span>{5}</span>
          </div>
          <div className={`${styles.buttonContainer}`}>
            <button className={`${styles.cohortButton3}`}>Cancel</button>
            <button className={`${styles.cohortButton1}`}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
