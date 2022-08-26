import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { VideoAtom } from '@/state/atoms/video.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../customVideoPlayer.module.scss';
import useHandleNotes from '../../Logic/useHandleNotes';
import FolderBar from '../FolderBar';
import NoteCard from './NoteCard';

export default function Notes() {
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);
  const videoData = useRecoilValue(VideoAtom);
  const {
    filteredNotes,
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
        <FolderBar
          onFolderClick={toggleAllNotes}
          onPlusClick={addNewNote}
          count={
            floatingNotes?.filter(
              (notes) => notes?.topic_id === videoData?.topicContent[0]?.topicId
            )?.length || 0
          }
        />

        <div
          className={`${styles.notesCardsContainer} ${
            document.fullscreenElement ? styles.notesCardsContainerFS : ''
          }`}>
          {floatingNotes
            .map((noteObj, i) => {
              if (noteObj?.topic_id !== videoData?.topicContent[0]?.topicId) return null;
              if (noteObj.isFloating) return null;
              if (!noteObj.isOpen) return null;

              return (
                <NoteCard
                  key={`${noteObj?.sequence}-${noteObj?.user_notes_id}`}
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
