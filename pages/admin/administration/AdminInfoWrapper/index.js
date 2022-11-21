import Button from '@/components/common/Button';
import styles from '../administration.module.scss';
import SingleInfoBlock from '../SingleInfoBlock';
import { updateOrgDetails } from '../helper/orgdata.helper';
const AdminInfoWrapper = ({
  data,
  isEditable,
  // toggleEditable,
  handleUpdate = function () {}
}) => {

  function handleClick() {
    handleUpdate();
  }
  return (
    <div className={`${styles.AdminInfoWraper}`}>
      {data?.map((v, i) => (
        <SingleInfoBlock key={i} userData={v} isEditable={isEditable} showImg={false} />
      ))}

      {isEditable ? (
        <div className={`${styles.AdminInfoButtonContainer}`}>
          <Button text={'Update'} clickHandler={handleClick} styleClass={styles.updateBtn} />
        </div>
      ) : ''}
    </div>
  );
};

export default AdminInfoWrapper;
