import styles from './inviteUserLearner.module.scss';
import { inviteTabData } from '../../Logic/userBody.helper';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
const InviteUserLearner = ({ inviteTabData }) => {
  return (
    <div className={`${styles.inviteUserLearner}`}>
      <LabeledRadioCheckbox type="checkbox" />

      <p>{inviteTabData.firstName}</p>
      <p>{inviteTabData.lastName}</p>
      <p>{inviteTabData.emailId}</p>
    </div>
  );
};

export default InviteUserLearner;
