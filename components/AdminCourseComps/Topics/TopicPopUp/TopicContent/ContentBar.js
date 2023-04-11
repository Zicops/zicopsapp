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
  customStyle = {},
  customClass = ''
}) {
  return (
    <>
      <div className={`${styles.contentBar} ${customClass}`} style={customStyle}>
        <span className={`w-15`}>{type}</span>
        <span className={`w-100 ${styles.center}`}>{description}</span>

        <div className={`w-15`}>
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
