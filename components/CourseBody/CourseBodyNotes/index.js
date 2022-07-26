import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAndSortTopicsBasedOnModuleId, filterModule } from '../../../helper/data.helper';
import { ModuleAtom, TopicAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import ItemSlider from '../../ItemSlider';
import Notes from '../../Notes';
import Bookmark from '../../slComponents/Bookmark';
import { userContext } from '../../../state/contexts/UserContext';
import Header from '../Header';
import useShowData from '../Logic/useShowData';
import TopicFileSlider from '../TopicFileSlider';
import LineText from '@/components/common/LineText';
import LearnerPageContainer from '@/components/common/LearnerPageContainer';
import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import NoteCard from '@/components/CustomVideoPlayer/UiComponents/Notes/NoteCard';
import useHandleNotes from '@/components/CustomVideoPlayer/Logic/useHandleNotes';
import styles from '../courseBody.module.scss';

export default function CourseBodyNotes() {
  const { bookmarkData, notes } = useContext(userContext);

  const courseContextData = useContext(courseContext);
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
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />
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
            <div className={`${styles.notesCardsContainer}`}>
              <div className={`${styles.addNote}`} onClick={addNewNote}>
                + Add Note
              </div>

              {floatingNotes
                .map((noteObj, i) => {
                  if (!noteObj.isOpen) return null;

                  return (
                    <NoteCard
                      key={noteObj.id}
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
