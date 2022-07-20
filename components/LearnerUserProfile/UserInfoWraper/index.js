import Button from '@/components/common/Button';
import styles from '../learnerUserProfile.module.scss';
import SingleInfo from '../SingleInfo';
// import SingleUserDetail from '../SingleUserDetail';
// import { userData } from '../Logic/userData.helper.js';
const UserInfoWraper = ({ userData, isEditable, toggleEditable }) => {
  // console.log(userData);

  return (
    <div className={`${styles.userInfoWraper}`}>
      {userData.map((v) => (
        <SingleInfo userData={v} isEditable={isEditable} />
      ))}

      {isEditable && (
        <div>
          <Button text={'Update'} clickHandler={toggleEditable} styleClass={styles.updateBtn} />
          {/* <Button text={'Cancel'} clickHandler={toggleEditable} /> */}
        </div>
      )}
    </div>
  );
};

export default UserInfoWraper;
