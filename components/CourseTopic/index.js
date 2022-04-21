import { useRecoilValue } from 'recoil';
import { ChapterAtom, ModuleAtom, TopicAtom } from '../../state/atoms/module.atoms';
import IconButton from '../common/IconButton';
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
  const { newModuleData, handleModuleInput, isAddModuleReady, addNewModule } = useAddModule(
    togglePopUp,
    refetchDataAndUpdateRecoil
  );

  // edit module
  const {
    editModule,
    activateEditModule,
    isEditModuleReady,
    handleEditModuleInput,
    handleEditModuleSubmit
  } = useEditModule(togglePopUp, refetchDataAndUpdateRecoil);

  // add chapter
  const {
    newChapterData,
    constructChapterData,
    isAddChapterReady,
    handleChapterInput,
    addNewChapter
  } = useAddChapter(togglePopUp, refetchDataAndUpdateRecoil);

  // edit chapter
  const {
    editChapter,
    activateEditChapter,
    isEditChapterReady,
    handleEditChapterInput,
    handleEditChapterSubmit
  } = useEditChapter(togglePopUp, refetchDataAndUpdateRecoil);

  // add topic
  const { newTopicData, constructTopicData, isAddTopicReady, handleTopicInput, addNewTopic } =
    useAddTopic(togglePopUp, refetchDataAndUpdateRecoil);

  // edit topic
  const {
    editTopic,
    activateEditTopic,
    topicContentData,
    handleEditTopicSubmit,
    toggleEditTopicForm,
    isEditTopicFormVisible,
    isEditTopicReady,
    handleEditTopicInput,
    updateTopicAndContext
  } = useEditTopic(togglePopUp, refetchDataAndUpdateRecoil);

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

      <div>
        {/* add module pop up */}
        <div className="row modbtn">
          <IconButton
            text="Add Module"
            styleClass="btnBlack"
            handleClick={() => togglePopUp('addModule', true)}
          />
        </div>
      </div>

      {/* add module pop up */}
      {isAddModulePopUpOpen && (
        <ModulePopUp
          closeModal={() => togglePopUp('addModule', false)}
          moduleData={newModuleData}
          handleInput={handleModuleInput}
          handleSubmit={addNewModule}
          isAddModuleReady={isAddModuleReady}
        />
      )}

      {/* edit module pop up */}
      {isEditModulePopUpOpen && (
        <ModulePopUp
          closeModal={() => togglePopUp('editModule', false)}
          moduleData={editModule}
          handleInput={handleEditModuleInput}
          handleSubmit={handleEditModuleSubmit}
          isAddModuleReady={isEditModuleReady}
        />
      )}

      {/* add chapter pop up */}
      {isAddChapterPopUpOpen && (
        <ChapterPopUp
          closeModal={() => togglePopUp('addChapter', false)}
          chapterData={newChapterData}
          handleInput={handleChapterInput}
          handleSubmit={addNewChapter}
          isChapterAddReady={isAddChapterReady}
        />
      )}

      {/* edit chapter pop up */}
      {isEditChapterPopUpOpen && (
        <ChapterPopUp
          closeModal={() => togglePopUp('editChapter', false)}
          chapterData={editChapter}
          handleInput={handleEditChapterInput}
          handleSubmit={handleEditChapterSubmit}
          isChapterAddReady={isEditChapterReady}
        />
      )}

      {/* add topic pop up */}
      {isAddTopicPopUpOpen && (
        <TopicPopUp
          closeModal={() => togglePopUp('addTopic', false)}
          addTopicData={{ newTopicData, handleTopicInput, addNewTopic, isAddTopicReady }}
        />
      )}

      {/* edit topic pop up */}
      {isEditTopicPopUpOpen && (
        <TopicPopUp
          closeModal={() => togglePopUp('editTopic', false)}
          editTopicData={{
            editTopic,
            ...topicContentData,
            handleEditTopicSubmit,
            toggleEditTopicForm,
            isEditTopicFormVisible,
            isEditTopicReady,
            handleEditTopicInput,
            updateTopicAndContext
          }}
          isEdit={true}
        />
      )}

      {/* move styles to .scss */}
      <style jsx>
        {`
          .modbtn {
            padding: 30px;
          }
          .buttongap {
            margin: 10px 0;
          }
        `}
      </style>
    </>
  );
}
