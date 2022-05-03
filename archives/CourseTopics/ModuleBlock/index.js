import { func, oneOf, string } from 'prop-types';
import styles from '../courseTopics.module.scss';

export default function ModuleBlock({ type, title, editHandler }) {
  return (
    <div className={`${styles.head} ${styles[type + 'Head']}`}>
      <div className={`${styles.title}`}>{title}</div>

      <div className={`${styles.editImg}`} onClick={editHandler}>
        <img src="/images/edit-icon.png" alt="" />
      </div>
    </div>
  );
}

ModuleBlock.propTypes = {
  type: oneOf(['module', 'chapter', 'topic']),
  title: string,
  editHandler: func
};
