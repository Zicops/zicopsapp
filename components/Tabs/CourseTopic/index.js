import { COURSE_STATUS } from '@/helper/constants.helper';
import { courseContext } from '@/state/contexts/CourseContext';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
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
  const { refetchDataAndUpdateRecoil } = useHandleCourseTopic();

  // recoil state
  const [addModulePopUp, setAddModulePopUp] = useRecoilState(PopUpStatesAtomFamily('addModule'));
  const [addChapterPopUp, setAddChapterPopUp] = useRecoilState(PopUpStatesAtomFamily('addChapter'));
  const [addTopicPopUp, setAddTopicPopUp] = useRecoilState(PopUpStatesAtomFamily('addTopic'));

  const moduleData = useRecoilValue(ModuleAtom);

  // add module
  const { newModuleData, setNewModuleData, isAddModuleReady, addNewModule } = useAddModule(
    refetchDataAndUpdateRecoil
  );

  // edit module
  const {
    editModule,
    setEditModule,
    activateEditModule,
    isEditModuleReady,
    handleEditModuleSubmit
  } = useEditModule(refetchDataAndUpdateRecoil);

  // add chapter
  const {
    newChapterData,
    setNewChapterData,
    constructChapterData,
    isAddChapterReady,
    addNewChapter
  } = useAddChapter(refetchDataAndUpdateRecoil);

  // edit chapter
  const {
    editChapter,
    setEditChapter,
    activateEditChapter,
    isEditChapterReady,
    handleEditChapterSubmit
  } = useEditChapter(refetchDataAndUpdateRecoil);

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
  } = useEditTopic(refetchDataAndUpdateRecoil);

  // add topic
  const {
    newTopicData,
    setNewTopicData,
    constructTopicData,
    isAddTopicReady,
    handleTopicInput,
    addNewTopic
  } = useAddTopic(refetchDataAndUpdateRecoil, activateEditTopic);

  const { fullCourse } = useContext(courseContext);

  let isDisabled = !!fullCourse?.qa_required;
  if (fullCourse?.status === COURSE_STATUS.publish) isDisabled = true;

  return (
    <>
      {/* module */}
      {moduleData &&
        moduleData.map((mod) => (
          <ModuleBox
            key={mod.id}
            mod={mod}
            isDisabled={isDisabled}
            refetchDataAndUpdateRecoil={refetchDataAndUpdateRecoil}
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
          isDisabled={isDisabled}
          styleClass="btnBlack"
          handleClick={() => setAddModulePopUp(true)}
        />
      </div>

      {/* add module pop up */}
      <ModulePopUp
        popUpState={[addModulePopUp, setAddModulePopUp]}
        moduleData={newModuleData || {}}
        setModuleData={setNewModuleData}
        handleSubmit={addNewModule}
        isAddModuleReady={isAddModuleReady}
      />

      {/* edit module pop up */}
      <ModulePopUp
        popUpState={[!!editModule?.id, setEditModule]}
        moduleData={editModule || {}}
        setModuleData={setEditModule}
        handleSubmit={handleEditModuleSubmit}
        isAddModuleReady={isEditModuleReady}
        isEdit={true}
      />

      {/* add chapter pop up */}
      <ChapterPopUp
        popUpState={[addChapterPopUp, setAddChapterPopUp]}
        setChapterData={setNewChapterData}
        chapterData={newChapterData || {}}
        handleSubmit={addNewChapter}
        isChapterAddReady={isAddChapterReady}
      />

      {/* edit chapter pop up */}
      <ChapterPopUp
        popUpState={[!!editChapter?.id, setEditChapter]}
        chapterData={editChapter || {}}
        setChapterData={setEditChapter}
        handleSubmit={handleEditChapterSubmit}
        isChapterAddReady={isEditChapterReady}
        isEdit={true}
      />

      {/* add topic pop up */}
      {addTopicPopUp && (
        <TopicPopUp
          popUpState={[addTopicPopUp, setAddTopicPopUp]}
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
      {editTopic?.id && (
        <TopicPopUp
          popUpState={[editTopic?.id, setEditTopic]}
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
