import Button from '@/components/common/Button';
import { IsUpdatedAtom } from '@/state/atoms/users.atom';
import { useRecoilState } from 'recoil';
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
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  function handleClick() {
    handleUpdate();
    toggleEditable();
    setIsUpdate(true);
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
