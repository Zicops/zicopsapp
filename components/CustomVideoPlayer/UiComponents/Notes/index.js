import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { useRecoilState } from 'recoil';
import styles from '../../customVideoPlayer.module.scss';
import useHandleNotes from '../../Logic/useHandleNotes';
import FolderBar from '../FolderBar';
import NoteCard from './NoteCard';

export default function Notes() {
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);
  const {
    handleNote,
    handleDragEnd,
    handleClose,
    handlePin,
    toggleAllNotes,
    addNewNote,
    deleteNote
  } = useHandleNotes();

  return (
    <>
      <div className={`${styles.folderBarContainer}`}>
        <FolderBar onFolderClick={toggleAllNotes} onPlusClick={addNewNote} />

        <div
          className={`${styles.notesCardsContainer} ${
            document.fullscreenElement ? styles.notesCardsContainerFS : ''
          }`}>
          {floatingNotes
            .map((noteObj, i) => {
              if (noteObj.isFloating) return null;
              if (!noteObj.isOpen) return null;

              return (
                <NoteCard
                  key={noteObj?.index}
                  handleDragEnd={(e) => handleDragEnd(e, noteObj)}
                  handleClose={() => handleClose(noteObj)}
                  handlePin={(e) => handlePin(e, noteObj)}
                  handleDelete={() => deleteNote(noteObj)}
                  handleNote={handleNote}
                  noteObj={noteObj}
                />
              );
            })
            .reverse()}
        </div>
      </div>
    </>
  );
}
