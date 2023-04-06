import styles from './vctoolMain.module.scss';
const NotesContainer = ({ hide }) => {
  return (
    <div className={`${styles.resourceBar}`}>
      <div className={`${styles.resourceHead}`}>
        <div>Notes</div>
        <button
          onClick={() => {
            hide();
          }}>
          <img src="/images/svg/vctool/close.svg" />
        </button>
      </div>

      <div className={`${styles.resourceScreen}`}>
        <div className={`${styles.resourceModeratorContainer}`}>
          <div className={`${styles.resourceModeratorScreen}`}>
            <div className={`${styles.moderatorAddResource}`}>
              <div className={styles.recourceIcon}>
                <img src="/images/svg/vctool/sticky-note-2.svg" />
              </div>
              <div className={`${styles.resourceAvailableHead}`}>No notes available!</div>
              <p className={`${styles.resourceAvailablesubHead}`}>Click below to add notes</p>
            </div>
          </div>
          <button
            className={`${styles.addResourceBtn}`}
            onClick={() => {
              addResource();
            }}>
            <div>+</div>Add Notes
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotesContainer;
