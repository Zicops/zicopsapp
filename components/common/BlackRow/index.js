import { element, func, oneOf, string } from 'prop-types';
import DeleteBtn from '../DeleteBtn';
import ToolTip from '../ToolTip';
import styles from './blackRow.module.scss';

export default function BlackRow({
  type,
  title,
  editHandler,
  deleteProps = {},
  extraComp,
  tooltipTitle,
  isDisabled = false
}) {
  return (
    <div className={`${styles.head} ${styles[type + 'Head']}`}>
      <div className={`${styles.title}`}>{title}</div>

      {extraComp}
      <div className={`${styles.actions}`}>
        {!isDisabled && (
          <>
            <div className={`${styles.editImg}`} onClick={editHandler}>
              <ToolTip title={tooltipTitle} placement="bottom">
                <img src="/images/svg/edit-box-line.svg" alt="" />
              </ToolTip>
            </div>

            {!!Object.keys(deleteProps).length && (
              <div className={`${styles.editImg}`}>
                <DeleteBtn {...deleteProps} />
              </div>
            )}
          </>
        )}
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
