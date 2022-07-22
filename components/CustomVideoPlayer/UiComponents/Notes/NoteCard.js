import styles from '../../customVideoPlayer.module.scss';

export default function NoteCard({
  noteObj,
  isDraggable = true,
  handleDragEnd = () => {},
  handleClose = () => {},
  handlePin = () => {}
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
          <img
            src={'/images/svg/pin.svg'}
            className={noteObj?.isPinned ? styles.pinned : ''}
            alt=""
            onClick={handlePin}
          />
          <img src="/images/svg/pin.svg" alt="" onClick={handlePin} />
          <img src="/images/svg/cancel.svg" alt="" onClick={handleClose} />
        </section>
      </div>

      <textarea
        cols="30"
        rows="10"
        onMouseDown={(e) => e.stopPropagation()}
        defaultValue={noteObj?.note}></textarea>
    </div>
  );
}
