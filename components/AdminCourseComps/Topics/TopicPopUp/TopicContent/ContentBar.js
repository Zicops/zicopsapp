import DeleteBtn from '@/components/common/DeleteBtn';
import { EditBoxIcon } from '@/components/common/ZicopsIcons';
import styles from '../../../adminCourseComps.module.scss';

export default function ContentBar({
  type = '',
  description = '',
  details = '',
  isDisabled = false,
  editHandler = null,
  deleteProps = {}
}) {
  return (
    <>
      <div className={`${styles.contentBar}`}>
        <span>{type}</span>
        <span>{description}</span>

        <div>
          {details}
          {!isDisabled && (
            <>
              {!!editHandler && (
                <div onClick={editHandler}>
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
