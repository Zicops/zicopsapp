import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { filterAndSortTopics } from '../../../helper/data.helper';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import IconButton from '../../common/IconButton';
import AddChapterPopUp from '../AddChapterPopUp';
import AddTopicPopUp from '../AddTopicPopUp';
import EditTopicPopUp from '../EditTopicPopUp';
import { getSquenceNumber } from '../Logic/courseTopics.helper';
import useAddTopicContent from '../Logic/useAddTopicContent';
import useEditChapter from '../Logic/useEditChapter';
import ModuleBlock from '../ModuleBlock';

export default function ChapterRow({
  moduleData,
  chapter,
  topics,
  courseId,
  addTopicData,
  editTopicData
}) {
  if (!chapter) return null;

  const filteredAndSortedData = filterAndSortTopics(topics, moduleData.id, chapter.id);

  const moduleContextData = useContext(moduleContext);
  const { topic } = moduleContextData;
  const {
    activateEditChapter,
    isEditChapterPopUpOpen,
    toggleEditChapterPopUp,
    currentChapter,
    isEditChapterReady,
    handleEditChapterInput,
    handleEditChapterSubmit
  } = useEditChapter(moduleContextData);

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

  return (
    <>
      <ModuleBlock
        type="chapter"
        title={`Chapter ${chapter.sequence} : ${chapter.id}`}
        editHandler={() => activateEditChapter(chapter.id)}
      />

      {filteredAndSortedData &&
        filteredAndSortedData.map((topic) => {
          console.log(topic);
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
            getSquenceNumber(topic, moduleData.id),
            chapter.id
          )
        }>
        <IconButton text="Add Topic" />
      </span>

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
      <Popup open={isEditChapterPopUpOpen} closeOnDocumentClick={false}>
        <AddChapterPopUp
          chapterData={currentChapter}
          closeModal={toggleEditChapterPopUp}
          handleInput={handleEditChapterInput}
          isChapterAddReady={isEditChapterReady}
          handleSubmit={handleEditChapterSubmit}
          isEdit={true}
        />
      </Popup>
      {/* 

      <span className="buttongap" onClick={openModalAddTopic}>
        <IconButton text="Add Topic" data={chap.id} />
      </span>

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
        <AddChapterPopup
          set={setChapterModal}
          modId={clickedChapter.moduleId}
          editdata={clickedChapter}
          show={setChapter}
        />
      </Popup> */}
    </>
  );
}
