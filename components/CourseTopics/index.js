import { useContext } from 'react';
import Popup from 'reactjs-popup';
import { courseContext } from '../../state/contexts/CourseContext';
import { moduleContext } from '../../state/contexts/ModuleContext';
import IconButton from '../common/IconButton';
import AddModulePopUp from './AddModulePopUp';
import useHandleCourseTopics from './Logic/useHandleCourseTopics';
import ModuleRow from './ModuleRow';

export default function CourseTopics() {
  const courseContextData = useContext(courseContext);
  const moduleContextData = useContext(moduleContext);
  const { data, addModuleData, editModuleData } = useHandleCourseTopics(
    courseContextData,
    moduleContextData
  );

  const { fullCourse, moduleData, chapterData, topicData } = data;
  const {
    newModule,
    addNewModule,
    toggleAddModulePopUp,
    isAddModulePopUpOpen,
    isAddModuleReady,
    handleModuleInput
  } = addModuleData;
  const {
    activateEditModule,
    isEditPopUpOpen,
    toggleEditPopUp,
    currentModule,
    isEditModuleReady,
    handleEditInput,
    handleEditSubmit
  } = editModuleData;
  return (
    <>
      <div>
        {moduleData.map((value, index) => (
          <ModuleRow
            key={index}
            data={{
              chapters: chapterData,
              topics: topicData,
              moduleData: value
            }}
            editDetails={{
              activateEdit: activateEditModule,
              editModuleData: currentModule,
              isModuleDataValid: isEditModuleReady,
              isEditPopUpOpen,
              toggleEditPopUp,
              handleEditInput,
              handleEditSubmit
            }}
            courseId={fullCourse.id}
          />
        ))}

        <div className="row modbtn">
          <span onClick={toggleAddModulePopUp}>
            <IconButton text="Add Module" styleClass="btnBlack" />
          </span>

          <Popup open={isAddModulePopUpOpen} closeOnDocumentClick={false}>
            <AddModulePopUp
              closeModel={toggleAddModulePopUp}
              moduleData={newModule}
              isAddModuleReady={isAddModuleReady}
              handleInput={handleModuleInput}
              handleSubmit={addNewModule}
            />
          </Popup>
        </div>
      </div>

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
