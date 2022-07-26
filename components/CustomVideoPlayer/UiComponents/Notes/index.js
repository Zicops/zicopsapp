import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { useRecoilState } from 'recoil';
import styles from '../../customVideoPlayer.module.scss';
import useHandleNotes from '../../Logic/useHandleNotes';
import FolderBar from '../FolderBar';
import NoteCard from './NoteCard';

export default function Notes() {
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);
  const { userNotes, handleDragEnd, handleClose, handlePin, showAll } = useHandleNotes();

  return (
    <>
      <div className={`${styles.folderBarContainer}`}>
        <FolderBar onFolderClick={showAll} />

        <div className={`${styles.notesCardsContainer} ${document.fullscreenElement ? styles.notesCardsContainerFS : ''}`}>
          {userNotes.map((noteObj, i) => {
            if (!noteObj.isOpen) return null;
            console.log('noteObj');

            return (
              <NoteCard
                key={noteObj.id}
                handleDragEnd={(e) => handleDragEnd(e, noteObj, i)}
                handleClose={() => handleClose(noteObj, i)}
                handlePin={(e) => handlePin(e, noteObj, i)}
                noteObj={noteObj}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
