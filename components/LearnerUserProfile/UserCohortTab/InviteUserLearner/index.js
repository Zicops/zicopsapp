import styles from './inviteUserLearner.module.scss';
import { inviteTabData } from '../../Logic/userBody.helper';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
const InviteUserLearner = ({ inviteTabData , handleSelect = ()=>{} }) => {

  // console.log(inviteTabData,'invite');
  return (
    <div className={`${styles.inviteUserLearner}`}>
      <div className={`${styles.checkBoxContainer}`}><LabeledRadioCheckbox type="checkbox" changeHandler={handleSelect}/></div>

      <p className={`${styles.firstName}`}>{inviteTabData?.first_name}</p>
      <p className={`${styles.lastName}`}>{inviteTabData?.last_name}</p>
      <p className={`${styles.email}`}>{inviteTabData?.email}</p>
    </div>
  );
};

export default InviteUserLearner;
