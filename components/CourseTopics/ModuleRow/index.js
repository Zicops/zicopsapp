import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { filterAndSortChapter, filterAndSortTopics } from '../../../helper/data.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import IconButton from '../../common/IconButton';
import AddChapterPopUp from '../AddChapterPopUp';
import AddModulePopUp from '../AddModulePopUp';
import AddTopicPopUp from '../AddTopicPopUp';
import ChapterRow from '../ChapterRow';
import styles from '../courseTopics.module.scss';
import EditTopicPopUp from '../EditTopicPopUp';
import { getSquenceNumber } from '../Logic/courseTopics.helper';
import useAddChapter from '../Logic/useAddChapter';
import useAddTopic from '../Logic/useAddTopic';
import useAddTopicContent from '../Logic/useAddTopicContent';
import useEditTopic from '../Logic/useEditTopic';
import ModuleBlock from '../ModuleBlock';

export default function ModuleRow({ data, courseId, editDetails }) {
  const { chapters, topics, moduleData } = data;
  const {
    activateEdit,
    editModuleData,
    isEditPopUpOpen,
    toggleEditPopUp,
    isModuleDataValid,
    handleEditInput,
    handleEditSubmit
  } = editDetails;

  const moduleContextData = useContext(moduleContext);
  const { chapter, topic } = moduleContextData;
  const {
    newChapter,
    isAddChapterPopUpOpen,
    isAddChapterReady,
    toggleChapterPopUp,
    createNewChapterInstance,
    handleChapterInput,
    addNewChapter
  } = useAddChapter(moduleContextData);
  const addTopicData = useAddTopic(moduleContextData);
  const editTopicData = useEditTopic(moduleContextData);
  const {
    newTopic,
    isAddTopicPopUpOpen,
    isAddTopicReady,
    createNewTopicInstance,
    toggleAddTopicPopUp,
    handleTopicInput,
    addNewTopic
  } = addTopicData;
  const {
    activateEditTopic,
    isEditTopicPopUpOpen,
    toggleEditTopicPopUp,
    currentTopic,
    isEditTopicReady,
    saveAllData
  } = editTopicData;

  const {
    handleAddTopicContentInput,
    saveVideoInContext,
    saveSubtitleInContext,
    addNewTopicContent,
    isTopicContentFormVisible,
    toggleTopicContentForm,
    bingeData
  } = useAddTopicContent(moduleContextData, currentTopic);

  const isChapterPresent = moduleData.isChapter;
  let filteredAndSortedData = [];

  if (isChapterPresent) {
    filteredAndSortedData = filterAndSortChapter(chapters, moduleData.id);
  } else {
    filteredAndSortedData = filterAndSortTopics(topics, moduleData.id);
  }

  return (
    <div className="row my_30">
      <div className={`${styles.moduleBox}`}>
        <ModuleBlock
          title={`Module ${moduleData.sequence} : ${moduleData.id}`}
          type="module"
          editHandler={() => activateEdit(moduleData.id)}
        />

        {isChapterPresent ? (
          <>
            {filteredAndSortedData &&
              filteredAndSortedData.map((chapter) => {
                return (
                  <ChapterRow
                    key={chapter.id}
                    chapter={chapter}
                    topics={topics}
                    courseId={courseId}
                    moduleData={moduleData}
                    addTopicData={addTopicData}
                    editTopicData={editTopicData}
                  />
                );
              })}

            <span
              className="buttongap"
              onClick={() =>
                createNewChapterInstance(
                  courseId,
                  moduleData.id,
                  getSquenceNumber(chapter, moduleData.id)
                )
              }>
              <IconButton text="Add Chapter" styleClass="btnGrey" />
            </span>
          </>
        ) : (
          <>
            {filteredAndSortedData &&
              filteredAndSortedData.map((topic) => {
                return (
                  <ModuleBlock
                    key={topic.id}
                    type="topic"
                    title={`Topic ${topic.sequence} : ${topic.id} : ${topic.name}`}
                    editHandler={() => activateEditTopic(topic.id)}
                  />
                );
              })}

            <span
              className="buttongap"
              onClick={() =>
                createNewTopicInstance(
                  courseId,
                  moduleData.id,
                  getSquenceNumber(topic, moduleData.id)
                )
              }>
              <IconButton text="Add Topic" />
            </span>
          </>
        )}

        <Popup open={isEditTopicPopUpOpen} closeOnDocumentClick={false}>
          <EditTopicPopUp
            inputHandlers={{
              handleInput: handleAddTopicContentInput || function () {},
              handleTopicVideo: saveVideoInContext || function () {},
              handleTopicSubtitle: saveSubtitleInContext || function () {},
              addNewCourseContent: addNewTopicContent
            }}
            isFormVisible={isTopicContentFormVisible}
            toggleForm={toggleTopicContentForm}
            topicData={currentTopic}
            closeModal={toggleEditTopicPopUp}
            isTopicAddReady={isEditTopicReady}
            saveAllData={saveAllData}
            bingeData={bingeData}
          />
        </Popup>
        <Popup open={isAddTopicPopUpOpen} closeOnDocumentClick={false}>
          <AddTopicPopUp
            topicData={newTopic}
            closeModal={toggleAddTopicPopUp}
            handleInput={handleTopicInput}
            isTopicAddReady={isAddTopicReady}
            handleSubmit={addNewTopic}
          />
        </Popup>
        <Popup open={isAddChapterPopUpOpen} closeOnDocumentClick={false}>
          <AddChapterPopUp
            chapterData={newChapter}
            closeModal={toggleChapterPopUp}
            handleInput={handleChapterInput}
            isChapterAddReady={isAddChapterReady}
            handleSubmit={addNewChapter}
          />
        </Popup>
        <Popup open={isEditPopUpOpen} closeOnDocumentClick={false}>
          <AddModulePopUp
            closeModel={toggleEditPopUp}
            moduleData={editModuleData}
            isAddModuleReady={isModuleDataValid}
            handleInput={handleEditInput}
            handleSubmit={handleEditSubmit}
            isEdit={true}
          />
        </Popup>
        {/* {mod.isChapter ? (
          <>
            {thisModChapter.map((chapter, index) => {
              return <ChapterRow key={index} mod={mod} chap={chapter} edit={editModalAddChapter} />;
            })}
            <span className="buttongap" onClick={openModalAddChapter}>
              <IconButton text="Add Chapter" styleClass="grey" />
            </span>
          </>
        ) : (
          <>
            {thisModTopics.map((topic, index) => {
              return (
                <ModuleAdded
                  key={index}
                  type="topic"
                  text={'Topic ' + topic.sequence + ': ' + topic.id + ': ' + topic.name}
                  edit={() => editTopic(topic)}
                />
              );
            })}
            <span className="buttongap" onClick={openModalAddTopic}>
              <IconButton text="Add Topic" data="" />
            </span>
          </>
        )}
        <Popup open={topicModal} closeOnDocumentClick={false} onClose={closeTopicModal}>
          <AddTopicPopup
            set={setTopicModal}
            modId={clickedTopic ? clickedTopic.moduleId : mod.id}
            chapId={clickedChapter}
            editdata={clickedTopic}
            show={setTopic}
          />
        </Popup>
        <Popup open={chapterModal} closeOnDocumentClick={false} onClose={closeChapterModal}>
          <AddChapterPopup set={setChapterModal} modId={mod.id} show={setChapter} />
        </Popup>
        <Popup open={openModal} closeOnDocumentClick={false} onClose={closeModal}>
          <AddModulePopup set={setModal} show={setModule} editdata={clickedModule} />
        </Popup> 
        */}
      </div>
    </div>
  );
}
