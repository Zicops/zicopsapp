import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { TopicContentAtom, TopicVideoAtom } from '../../../../state/atoms/module.atoms';
// imported from common, recommended to remove later
import styles from '../../../common/PopUp/popUp.module.scss';
import Quiz from '../../../medium/Quiz';
import Accordion from '../../../small/Accordion';
import PopUp from '../../../common/PopUp';
import ModuleBlock from '../ModuleBlock';
import AddTopicContentForm from './AddTopicContentForm';
import AddTopicForm from './AddTopicForm';
import BingeForm from './BingeForm';
import ResourcesForm from './ResourcesForm';
import TopicContentView from './TopicContentView';
import { filterTopicContent } from '../../../../helper/data.helper';

export default function TopicPopUp({
  addTopicData = {},
  editTopicData = {},
  closeModal,
  isEdit = false
}) {
  const { newTopicData, handleTopicInput, addNewTopic, isAddTopicReady } = addTopicData;
  const {
    editTopic,
    toggleEditTopicForm,
    isEditTopicFormVisible,
    isEditTopicReady,

    localStates: addTopicContentLocalStates,
    setNewTopicContent,
    isTopicContentFormVisible,
    toggleTopicContentForm,
    inputHandlers,
    addNewTopicContent,
    isAddTopicContentReady,
    handleEditTopicSubmit,
    handleEditTopicInput,
    updateTopicAndContext
  } = editTopicData;

  const submitBtnObj = {
    name: 'Save',
    handleClick: addNewTopic,
    disabled: !isAddTopicReady
  };
  const closeBtnObj = { name: 'Cancel', handleClick: closeModal };

  let topicVideo,
    filteredTopicContent = null;
  const editTopicFormRef = useRef(null),
    addTopicContentRef = useRef(null);

  const topicContent = useRecoilValue(TopicContentAtom);
  if (isEdit) {
    filteredTopicContent = filterTopicContent(topicContent, editTopic?.id);
    closeBtnObj.name = 'Design Later';
    closeBtnObj.handleClick = () => {
      const shouldCloseModal = confirm(
        'Your unsaved data will be lost. Are you sure to close modal'
      ).valueOf();

      if (shouldCloseModal) {
        closeModal();
      }
    };

    submitBtnObj.name = 'Design';
    submitBtnObj.handleClick = handleEditTopicSubmit;
    submitBtnObj.disabled = false;

    topicVideo = useRecoilValue(TopicVideoAtom)[0] || addTopicContentLocalStates.newTopicVideo;
  }

  return (
    <>
      <PopUp
        title={`Topic ${newTopicData?.sequence || editTopic?.sequence}`}
        submitBtn={submitBtnObj}
        closeBtn={closeBtnObj}>
        {/* add topic form popup */}
        {!isEdit && <AddTopicForm handleInput={handleTopicInput} topicData={newTopicData} />}

        {/* edit topic form popup containing add topic content, binge data, resources, quiz */}
        {isEdit && (
          <>
            <div className="topicAdded">
              <ModuleBlock
                type="module"
                title={`Topic ${editTopic.sequence} : ${editTopic.name}`}
                editHandler={() => {
                  if (!isEditTopicFormVisible)
                    editTopicFormRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'center'
                    });
                  toggleEditTopicForm();
                }}
              />
            </div>

            {/* add topic content form section */}
            <div className="chapter_body">
              {/* edit topic form */}
              <div ref={editTopicFormRef}>
                {isEditTopicFormVisible && (
                  <>
                    <AddTopicForm
                      handleInput={handleEditTopicInput}
                      topicData={editTopic}
                      isEdit={true}
                    />

                    <div className={`${styles.footer}`}>
                      <div className={`form_row`}>
                        <div className={`col_25`}></div>
                        <div className={`col_75`}>
                          <div className={`${styles.button_container}`}>
                            {/* <button
                            type="button"
                            value="cancel"
                            className={`${styles.btn_cancel_add}`}
                            onClick={() => toggleEditTopicForm(false)}>
                            Cancel
                          </button> */}
                            <button
                              type="button"
                              value="add"
                              className={`${
                                isEditTopicReady
                                  ? styles.btn_cancel_add
                                  : styles.btn_cancel_add_disabled
                              }`}
                              disabled={!isEditTopicReady}
                              onClick={() => updateTopicAndContext()}>
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="row my_30">
                <div className="topic_title">Content</div>
              </div>
              <div ref={addTopicContentRef}>
                {isTopicContentFormVisible && (
                  <AddTopicContentForm
                    topicContent={filteredTopicContent}
                    setNewTopicContent={setNewTopicContent}
                    data={addTopicContentLocalStates}
                    inputHandlers={inputHandlers}
                    addNewTopicContent={addNewTopicContent}
                    isAddTopicContentReady={isAddTopicContentReady}
                  />
                )}
              </div>
              {/* all the topic content added and saved */}
              <TopicContentView
                topicContent={filteredTopicContent}
                toggleTopicContentForm={() => {
                  if (!isTopicContentFormVisible)
                    addTopicContentRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                      inline: 'center'
                    });
                  toggleTopicContentForm();
                }}
              />

              {/* binge accordion */}
              <Accordion
                title="Binge it"
                content={
                  <BingeForm topicVideo={topicVideo} handleInput={inputHandlers.handleBingeInput} />
                }
              />
              <Accordion title="Quiz" content={<Quiz />} />
              <Accordion
                title="Resources"
                content={
                  <ResourcesForm
                    topicId={editTopic?.id || ''}
                    courseId={editTopic?.courseId || ''}
                  />
                }
              />
            </div>
          </>
        )}
      </PopUp>

      {/* move to .scss */}
      <style jsx>{`
        .add_module_popup {
          width: 800px;
          position: fixed;
          top: 50%;
          left: 57%;
          transform: translate(-50%, -50%);
        }
        .module_add {
          width: 100%;
          padding: 20px;
          border-radius: 10px;
          background-color: rgb(4, 4, 4);
          opacity: 0.95;
          box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.34),
            -5px -5px 5px 0px rgba(247, 241, 241, 0.16);
        }
        .module_head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .module_title {
          color: #858f8f;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          margin: auto;
          margin-bottom: 15px;
        }
        .cross_img img {
          width: 20px;
          cursor: pointer;
        }
        .chapter_section {
          display: flex;
        }
        .radio_btn input {
          width: 20px;
          height: 20px;
          border-color: tomato;
        }
        .chapter {
          padding-left: 20px;
          width: 400px;
        }
        .chapter .chapter_head {
          font-size: 15px;
          color: white;
          text-transform: capitalize;
        }
        .chapter .chapter_desc {
          font-size: 13px;
          color: #858f8f;
          word-wrap: wrap;
          padding-top: 5px;
        }
        .module_foot {
          padding: 10px;
          margin: auto;
        }
        .btn_cancel_add {
          width: 150px;
          height: 40px;
          background-color: #202222;
          border: 2px solid #858f8f;
          color: #858f8f;
          cursor: pointer;
          margin-right: 15px;
          text-transform: capitalize;
          font-size: 15px;
        }
        .btn_cancel_add_disabled {
          width: 150px;
          height: 40px;
          background-color: #202222;
          border: 2px solid #858f8f;
          color: #858f8f;
          cursor: no-drop;
          margin-right: 15px;
          text-transform: capitalize;
          font-size: 15px;
          opacity: 0.5;
        }
        .btn_cancel_add:hover {
          border-color: #ffffff;
          color: #ffffff;
          background-color: #1a1a1a;
        }
      `}</style>
    </>
  );
}
