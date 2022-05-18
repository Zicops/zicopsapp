import Button from '../../../common/Button';
import styles from './footerBtns.module.scss';

export default function FooterBtns({
  cancelText = 'Cancel',
  submitText = 'Submit',
  handleCancel = function () {},
  handleSave = function () {}
}) {
  return (
    <div className={`${styles.bt_Container}`}>
      <Button text={cancelText} clickHandler={handleCancel} />
      <Button text={submitText} clickHandler={handleSave} />
    </div>
  );
}
