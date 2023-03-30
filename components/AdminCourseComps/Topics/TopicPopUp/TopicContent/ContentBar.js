import DeleteBtn from '@/components/common/DeleteBtn';
import { EditBoxIcon } from '@/components/common/ZicopsIcons';
import styles from '../../../adminCourseComps.module.scss';

export default function ContentBar({
  type = '',
  description = '',
  details = '',
  isDisabled = false,
  editHandler = null,
  deleteProps = {},
  customStyle = {}
}) {
  return (
    <>
      <div className={`${styles.contentBar}`} style={customStyle}>
        <span>{type}</span>
        <span>{description}</span>

        <div>
          <span>{details}</span>

          {!isDisabled && (
            <>
              {!!editHandler && (
                <div className={styles.editImg} onClick={editHandler}>
                  <EditBoxIcon />
                </div>
              )}

              <DeleteBtn {...deleteProps} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
