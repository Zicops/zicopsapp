import { useRecoilValue } from 'recoil';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import IconButton from '../../common/IconButton';
import ChapterPopUp from './ChapterPopUp';
import useAddChapter from './Logic/useAddChapter';
import useAddModule from './Logic/useAddModule';
import useAddTopic from './Logic/useAddTopic';
import useEditChapter from './Logic/useEditChapter';
import useEditModule from './Logic/useEditModule';
import useEditTopic from './Logic/useEditTopic';
import useHandleCourseTopic from './Logic/useHandleCourseTopic';
import ModuleBox from './ModuleBox';
import ModulePopUp from './ModulePopUp';
import TopicPopUp from './TopicPopUp';

export default function CourseTopic() {
  const { popUpValues, togglePopUp, refetchDataAndUpdateRecoil } = useHandleCourseTopic();
  const {
    isAddModulePopUpOpen,
    isEditModulePopUpOpen,
    isAddChapterPopUpOpen,
    isEditChapterPopUpOpen,
    isAddTopicPopUpOpen,
    isEditTopicPopUpOpen
  } = popUpValues;

  const moduleData = useRecoilValue(ModuleAtom);

  // add module
  const { newModuleData, setNewModuleData, isAddModuleReady, addNewModule } = useAddModule(
    togglePopUp,
    refetchDataAndUpdateRecoil
  );

  // edit module
  const {
    editModule,
    setEditModule,
    activateEditModule,
    isEditModuleReady,
    handleEditModuleSubmit
  } = useEditModule(togglePopUp, refetchDataAndUpdateRecoil);

  // add chapter
  const {
    newChapterData,
    setNewChapterData,
    constructChapterData,
    isAddChapterReady,
    addNewChapter
  } = useAddChapter(togglePopUp, refetchDataAndUpdateRecoil);

  // edit chapter
  const {
    editChapter,
    setEditChapter,
    activateEditChapter,
    isEditChapterReady,
    handleEditChapterSubmit
  } = useEditChapter(togglePopUp, refetchDataAndUpdateRecoil);

  // edit topic
  const {
    editTopic,
    setEditTopic,
    activateEditTopic,
    topicContentData,
    handleEditTopicSubmit,
    toggleEditTopicForm,
    isEditTopicFormVisible,
    isEditTopicReady,
    updateTopicAndContext
  } = useEditTopic(togglePopUp, refetchDataAndUpdateRecoil);

  // add topic
  const {
    newTopicData,
    setNewTopicData,
    constructTopicData,
    isAddTopicReady,
    handleTopicInput,
    addNewTopic
  } = useAddTopic(togglePopUp, refetchDataAndUpdateRecoil, activateEditTopic);

  return (
    <>
      {/* module */}
      {moduleData &&
        moduleData.map((mod) => (
          <ModuleBox
            key={mod.id}
            mod={mod}
            activateHandlers={{
              activateEditModule,
              constructChapterData,
              activateEditChapter,
              constructTopicData,
              activateEditTopic
            }}
          />
        ))}

      {/* add module pop up */}
      <div className="center-element-with-flex">
        <IconButton
          text="Add Module"
          styleClass="btnBlack"
          handleClick={() => togglePopUp('addModule', true)}
        />
      </div>

      {/* add module pop up */}
      {isAddModulePopUpOpen && (
        <ModulePopUp
          closeModal={() => togglePopUp('addModule', false)}
          moduleData={newModuleData}
          setModuleData={setNewModuleData}
          handleSubmit={addNewModule}
          isAddModuleReady={isAddModuleReady}
        />
      )}

      {/* edit module pop up */}
      {isEditModulePopUpOpen && (
        <ModulePopUp
          closeModal={() => togglePopUp('editModule', false)}
          moduleData={editModule}
          setModuleData={setEditModule}
          handleSubmit={handleEditModuleSubmit}
          isAddModuleReady={isEditModuleReady}
          isEdit={true}
        />
      )}

      {/* add chapter pop up */}
      {isAddChapterPopUpOpen && (
        <ChapterPopUp
          closeModal={() => togglePopUp('addChapter', false)}
          setChapterData={setNewChapterData}
          chapterData={newChapterData}
          handleSubmit={addNewChapter}
          isChapterAddReady={isAddChapterReady}
        />
      )}

      {/* edit chapter pop up */}
      {isEditChapterPopUpOpen && (
        <ChapterPopUp
          closeModal={() => togglePopUp('editChapter', false)}
          chapterData={editChapter}
          setChapterData={setEditChapter}
          handleSubmit={handleEditChapterSubmit}
          isChapterAddReady={isEditChapterReady}
          isEdit={true}
        />
      )}

      {/* add topic pop up */}
      {isAddTopicPopUpOpen && (
        <TopicPopUp
          closeModal={() => togglePopUp('addTopic', false)}
          addTopicData={{
            newTopicData,
            setNewTopicData,
            handleTopicInput,
            addNewTopic,
            isAddTopicReady
          }}
        />
      )}

      {/* edit topic pop up */}
      {isEditTopicPopUpOpen && (
        <TopicPopUp
          closeModal={() => togglePopUp('editTopic', false)}
          editTopicData={{
            editTopic,
            setEditTopic,
            ...topicContentData,
            handleEditTopicSubmit,
            toggleEditTopicForm,
            isEditTopicFormVisible,
            isEditTopicReady,
            updateTopicAndContext
          }}
          isEdit={true}
        />
      )}
    </>
  );
}
