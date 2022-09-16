import { element, func, oneOf, string } from 'prop-types';
import ToolTip from '../ToolTip';
import styles from './blackRow.module.scss';

export default function BlackRow({ type, title, editHandler, extraComp, tooltipTitle}) {
  return (
    <div className={`${styles.head} ${styles[type + 'Head']}`}>
      <div className={`${styles.title}`}>{title}</div>

      {extraComp}
      <div className={`${styles.editImg}`} onClick={editHandler}>
       <ToolTip title={tooltipTitle} placement="bottom"><img src="/images/edit-icon.png" alt="" /></ToolTip>
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
