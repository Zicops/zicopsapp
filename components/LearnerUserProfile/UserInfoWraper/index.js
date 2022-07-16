import styles from '../learnerUserProfile.module.scss';
import SingleInfo from '../SingleInfo';
// import SingleUserDetail from '../SingleUserDetail';
// import { userData } from '../Logic/userData.helper.js';
const UserInfoWraper = ({ userData }) => {
  console.log(userData);

  return (
    <div className={`${styles.userInfoWraper}`}>
      {userData.map((v) => (
        <SingleInfo userData={v} />
      ))}
    </div>
  );
};

export default UserInfoWraper;
