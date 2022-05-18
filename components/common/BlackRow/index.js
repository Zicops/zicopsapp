import { element, func, oneOf, string } from 'prop-types';
import styles from './blackRow.module.scss';

export default function BlackRow({ type, title, editHandler, extraComp }) {
  return (
    <div className={`${styles.head} ${styles[type + 'Head']}`}>
      <div className={`${styles.title}`}>{title}</div>

      {extraComp}
      <div className={`${styles.editImg}`} onClick={editHandler}>
        <img src="/images/edit-icon.png" alt="" />
      </div>
    </div>
  );
}

BlackRow.propTypes = {
  type: oneOf(['large', 'medium', 'small']).isRequired,
  title: string.isRequired,
  editHandler: func.isRequired,
  extraComp: element
};
