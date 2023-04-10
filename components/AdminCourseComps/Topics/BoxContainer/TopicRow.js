import DeleteBtn from '@/components/common/DeleteBtn';
import ToolTip from '@/components/common/ToolTip';
import { element, func, oneOf, string } from 'prop-types';
import styles from '../../adminCourseComps.module.scss';

export default function TopicRow({
  title,
  editHandler,
  deleteProps = {},
  extraComp,
  tooltipTitle,
  isDisabled = false
}) {
  return (
    <div className={`${styles.topicRow}`}>
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

TopicRow.propTypes = {
  type: oneOf(['large', 'medium', 'small']).isRequired,
  title: string.isRequired,
  editHandler: func.isRequired,
  extraComp: element
};
