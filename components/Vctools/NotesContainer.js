import { ActiveClassroomTopicIdAtom, TopicAtom } from '@/state/atoms/module.atoms';
import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { useRecoilValue } from 'recoil';
import useHandleNotes from '../CustomVideoPlayer/Logic/useHandleNotes';
import NoteCard from '../CustomVideoPlayer/UiComponents/Notes/NoteCard';
import { CourseTopicsAtomFamily } from '../LearnerCourseComps/atoms/learnerCourseComps.atom';
import styles from './vctoolMain.module.scss';

const NotesContainer = ({ hide }) => {
  const floatingNotes = useRecoilValue(FloatingNotesAtom);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeClassroomTopicId));
  const allTopics = useRecoilValue(TopicAtom);
  const currentTopicData =
    topicData || allTopics?.find((topic) => topic?.id === activeClassroomTopicId);

  const currentTopicNotes = floatingNotes?.filter(
    (note) => note?.topic_id === activeClassroomTopicId,
  );
  const {
    handleNote,
    handleDragEnd,
    handleClose,
    handlePin,
    showAll,
    hideAll,
    addNewNote,
    deleteNote,
  } = useHandleNotes();

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
          {!currentTopicNotes?.length ? (
            <div className={`${styles.resourceModeratorScreen}`}>
              <div className={`${styles.moderatorAddResource}`}>
                <div className={styles.recourceIcon}>
                  <img src="/images/svg/vctool/sticky-note-2.svg" />
                </div>
                <div className={`${styles.resourceAvailableHead}`}>No notes available!</div>
                <p className={`${styles.resourceAvailablesubHead}`}>Click below to add notes</p>
              </div>
            </div>
          ) : (
            <section className={`${styles.notesContainer}`}>
              {currentTopicNotes
                .map((noteObj, i) => {
                  return (
                    <NoteCard
                      key={noteObj.id}
                      handleDelete={() => deleteNote(noteObj)}
                      handleNote={handleNote}
                      noteObj={noteObj}
                      isDraggable={false}
                      topicData={{
                        topicId: activeClassroomTopicId,
                        moduleId: currentTopicData?.moduleId,
                      }}
                    />
                  );
                })
                .reverse()}
            </section>
          )}
          <button
            className={`${styles.addResourceBtn}`}
            onClick={() => {
              addNewNote(activeClassroomTopicId);
            }}>
            <div>+</div>Add Notes
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotesContainer;
