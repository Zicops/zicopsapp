import BookmarkCard from '@/components/common/BookmarkCard';
import LearnerPageContainer from '@/components/common/LearnerPageContainer';
import LineText from '@/components/common/LineText';
import useHandleNotes from '@/components/CustomVideoPlayer/Logic/useHandleNotes';
import NoteCard from '@/components/CustomVideoPlayer/UiComponents/Notes/NoteCard';
import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { userContext } from '@/state/contexts/UserContext';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAndSortTopicsBasedOnModuleId, filterModule } from '../../../helper/data.helper';
import { ModuleAtom, TopicAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import styles from '../courseBody.module.scss';
import Header from '../Header';
import useShowData from '../Logic/useShowData';
import TopicFileSlider from '../TopicFileSlider';

export default function CourseBodyNotes() {
  const courseContextData = useContext(courseContext);
  const { fullCourse } = courseContextData;
  const {
    getModuleOptions,
    handleModuleChange,
    selectedModule,
    isNotesVisible,
    toggleNotesVisibility
  } = useShowData(courseContextData);
  const moduleData = useRecoilValue(ModuleAtom);
  const topicData = useRecoilValue(TopicAtom);
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);

  const options = getModuleOptions();
  const currentModule = filterModule(moduleData, selectedModule?.value);

  const { bookmarkData: allBookmarks } = useContext(userContext);
  const {
    handleNote,
    handleDragEnd,
    handleClose,
    handlePin,
    showAll,
    hideAll,
    addNewNote,
    deleteNote
  } = useHandleNotes();

  const filteredAndSortedData = filterAndSortTopicsBasedOnModuleId(
    topicData,
    selectedModule?.value
  );

  return (
    <>
      <Dropdown
        options={options}
        handleChange={handleModuleChange}
        value={selectedModule}
        customStyles={{ margin: '20px auto 0px' }}
      />
      <Header
        title={currentModule?.name}
        description={currentModule?.description || ''}
        expertise={currentModule?.level?.split(',').join(' | ')}
      />

      <TopicFileSlider
        key={selectedModule?.value}
        itemsArr={filteredAndSortedData}
        showResources={toggleNotesVisibility}
        isResourceShown={isNotesVisible}
        isNotes={true}
      />

      {isNotesVisible && (
        <>
          <LineText text={isNotesVisible.split('|:|')[1]} />
          <LearnerPageContainer>
            <div className={`${styles.fileContainer}`}>
              <h3>Notes</h3>
              <div className={`${styles.notesCardsContainer}`}>
                <div
                  className={`${styles.addNote}`}
                  onClick={() => addNewNote(isNotesVisible.split('|:|')[0])}>
                  <span>+</span>
                  Add Note
                </div>

                {floatingNotes
                  .map((noteObj, i) => {
                    if (noteObj?.topic_id !== isNotesVisible.split('|:|')[0]) return null;

                    return (
                      <NoteCard
                        key={noteObj.id}
                        handleDelete={() => deleteNote(noteObj)}
                        handleNote={handleNote}
                        noteObj={noteObj}
                        isDraggable={false}
                      />
                    );
                  })
                  .reverse()}
              </div>
            </div>

            <div className={`${styles.fileContainer}`}>
              <h3>Bookmarks</h3>
              <div className={`${styles.bookmarkContainer}`}>
                {allBookmarks?.map((bookmark, i) => {
                  if (bookmark?.topic_id !== isNotesVisible.split('|:|')[0]) return null;

                  return (
                    <BookmarkCard
                      data={{
                        img: fullCourse?.tileImg,
                        courseName: fullCourse?.name,
                        title: bookmark?.name,
                        timestamp: bookmark?.time_stamp
                      }}
                      bookmarkData={bookmark}
                      key={`${bookmark?.user_bm_id}-${i}`}
                    />
                  );
                })}
              </div>
            </div>
          </LearnerPageContainer>
        </>
      )}

      {/* <ItemSlider items={options} /> */}
      {/* <div className="doubleContainer" style={{ padding: '0 calc(7% + 25px)' }}>
        {bookmarkData.map((b, i) => {
          return (
            <Bookmark
              key={i}
              img={b.captureImg}
              timestamp={b.timestamp.toFixed(2)}
              title={b.title}
            />
          );
        })}
      </div>
      {notes.map((n, i) => {
        return <Notes key={i} timestamp={n.timestamp} title={n.title} notes={n.notes} />;
      })} */}

      <style jsx>{`
        .doubleContainer {
          display: grid;
          grid-template-columns: auto auto;
          column-gap: 20px;
        }
      `}</style>
    </>
  );
}
