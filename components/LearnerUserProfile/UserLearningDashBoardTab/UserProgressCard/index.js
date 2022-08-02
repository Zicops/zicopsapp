import Dropdown from '@/components/common/Dropdown';

import styles from '../userLearningDashboardTab.module.scss';
import UserProgressDataCard from '../UserProgressDataCard';

const options = [
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Open', value: 'Open' }
];
const UserProgressCard = ({ data }) => {
  return (
    <div className={`${styles.userProgressCard}`}>
      <div className={`${styles.header}`}>
        <span>Self-Paced</span>
        <Dropdown options={options} customStyles={{ margin: '0px', width: '50%' }} />
      </div>
      <div className={`${styles.body}`}>
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        <UserProgressDataCard />
        {data}
      </div>
    </div>
  );
};

export default UserProgressCard;
