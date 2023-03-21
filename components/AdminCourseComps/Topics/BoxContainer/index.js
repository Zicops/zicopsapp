import DeleteBtn from '@/components/common/DeleteBtn';
import styles from '../../adminCourseComps.module.scss';

export default function BoxContainer({
  title = '',
  isChapter = false,
  isDisabled = false,
  editHandler = () => {},
  deleteProps = {},
  children
}) {
  return (
    <>
      <div className={`w-100 ${styles.boxContainer} ${isChapter ? styles.chapterBox : ''}`}>
        <div className={styles.boxHeader}>
          {title}

          <div className={`${styles.actions}`}>
            {!isDisabled && (
              <>
                <div className={`${styles.editImg}`} onClick={editHandler}>
                  <img src="/images/svg/edit-box-line.svg" alt="" />
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

        {children}
      </div>
    </>
  );
}
