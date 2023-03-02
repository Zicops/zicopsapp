import Button from '@/components/common/Button';
import styles from '../learnerUserProfile.module.scss';
import SingleInfo from '../SingleInfo';
// import SingleUserDetail from '../SingleUserDetail';
// import { userData } from '../Logic/userData.helper.js';
const UserInfoWraper = ({
  userData,
  isEditable,
  toggleEditable,
  isOrg = false,
  handleUpdate = function () {}
}) => {
  function handleClick() {
    handleUpdate();
    toggleEditable();
  }
  return (
    <div className={`${styles.userInfoWraper}`}>
      {userData.map((v, i) => (
        <SingleInfo key={i} userData={v} isEditable={isEditable} isOrg={isOrg} />
      ))}

      {isEditable && (
        <div className={`${styles.userInfoButtonContainer}`}>
          <Button text={'Update'} clickHandler={handleClick} styleClass={styles.updateBtn} />
          {/* <Button text={'Cancel'} clickHandler={toggleEditable} /> */}
        </div>
      )}
    </div>
  );
};

export default UserInfoWraper;
