import styles from '../../customVideoPlayer.module.scss';

export default function NoteCard({
  noteObj,
  isDraggable = true,
  handleDragEnd = () => {},
  handleClose = () => {},
  handlePin = () => {},
  handleDelete = () => {},
  handleNote = () => {}
}) {
  return (
    <div
      className={`${styles.noteCard}`}
      draggable={isDraggable}
      onDragEnd={handleDragEnd}
      // onDragStart={(e) => console.log(e)}
    >
      <div className={`${styles.notesHeader}`}>
        <p>Note {noteObj?.index}</p>
        <section>
          {/* <img
            src={'/images/svg/pin-dark.svg'}
            className={noteObj?.isPinned ? styles.pinned : ''}
            alt=""
            onClick={handlePin}
          /> */}
          {/* <img src="/images/svg/pin-dark.svg" alt="" onClick={handlePin} /> */}
          {/* <img src="/images/svg/clear-dark.svg" alt="" onClick={handleClose} /> */}
          <svg
            className={`${styles.pin} ${noteObj.isPinned ? styles.pinned : ''}`}
            onClick={handlePin}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14 4V9C14 10.12 14.37 11.16 15 12H9C9.65 11.14 10 10.1 10 9V4H14ZM17 2H7C6.45 2 6 2.45 6 3C6 3.55 6.45 4 7 4H8V9C8 10.66 6.66 12 5 12V14H10.97V21L11.97 22L12.97 21V14H19V12C17.34 12 16 10.66 16 9V4H17C17.55 4 18 3.55 18 3C18 2.45 17.55 2 17 2Z" />
          </svg>
          <svg
            className={`${styles.delete}`}
            onClick={handleDelete}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M9.58332 40.25V11.5H7.66666V7.66667H17.25V5.75H28.75V7.66667H38.3333V11.5H36.4167V40.25H9.58332ZM17.25 32.5833H21.0833V15.3333H17.25V32.5833ZM24.9167 32.5833H28.75V15.3333H24.9167V32.5833Z" />
          </svg>
          <svg
            className={`${styles.clear}`}
            onClick={handleClose}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
          </svg>
        </section>
      </div>

      <textarea
        // disabled
        cols="30"
        placeholder="Type here"
        rows="10"
        onMouseDown={(e) => e.stopPropagation()}
        value={noteObj?.note}
        onChange={(e) => handleNote(e, noteObj)}></textarea>
    </div>
  );
}
