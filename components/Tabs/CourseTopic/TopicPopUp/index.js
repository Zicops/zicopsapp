import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterTopicContent } from '../../../../helper/data.helper';
import {
  TopicContentAtom,
  TopicVideoAtom,
  uploadStatusAtom
} from '../../../../state/atoms/module.atoms';
import BlackRow from '../../../common/BlackRow';
import Button from '../../../common/Button';
import PopUp from '../../../common/PopUp';
import { IsDataPresentAtom } from '../../../common/PopUp/Logic/popUp.helper';
import Accordion from '../../../small/Accordion';
import useAddAssessment from '../Logic/useAddAssessment';
import AddTopicContentForm from './AddTopicContentForm';
import AddTopicForm from './AddTopicForm';
import AssessmentForm from './AssessmentForm';
import BingeForm from './BingeForm';
import ClassroomForm from './ClassroomForm';
import QuizForm from './QuizForm';
import ResourcesForm from './ResourcesForm';
import SubtitleForm from './SubtitleForm';
import TopicContentView from './TopicContentView';
import styles from '../../courseTabs.module.scss';

export default function TopicPopUp({
  addTopicData = {},
  editTopicData = {},
  popUpState = [],
  isEdit = false
}) {
  const { newTopicData, setNewTopicData, addNewTopic, isAddTopicReady } = addTopicData;
  const {
    editTopic,
    setEditTopic,
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
    updateTopicAndContext
  } = editTopicData;

  const submitBtnObj = {
    name: 'Save',
    handleClick: addNewTopic,
    disabled: !isAddTopicReady
  };
  const closeBtnObj = {
    name: 'Cancel'
    // handleClick: closeModal
  };

  let topicVideo,
    filteredTopicContent = null;
  const editTopicFormRef = useRef(null),
    addTopicContentRef = useRef(null);

  // recoil state
  const topicContent = useRecoilValue(TopicContentAtom);
  const uploadStatus = useRecoilValue(uploadStatusAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);

  const assessmentData = useAddAssessment(editTopic?.id, setEditTopic);

  useEffect(() => {
    if (isEdit && !isPopUpDataPresent) setIsPopUpDataPresent(true);
  }, []);

  if (isEdit) {
    filteredTopicContent = filterTopicContent(topicContent, editTopic?.id);
    closeBtnObj.name = 'Cancel';
    closeBtnObj.disabled = !!uploadStatus;

    submitBtnObj.name = 'Design';
    submitBtnObj.handleClick = handleEditTopicSubmit;
    submitBtnObj.disabled = !!uploadStatus;

    if (!filteredTopicContent.length) submitBtnObj.disabled = true;
    topicVideo = useRecoilValue(TopicVideoAtom)[0] || addTopicContentLocalStates.newTopicVideo;
  }

  if (editTopic?.type === 'Assessment') {
    submitBtnObj.handleClick = assessmentData.saveAssessment;
    submitBtnObj.disabled = !assessmentData.assessmentData?.examId;
  }

  return (
    <>
      <PopUp
        title={`Topic ${newTopicData?.sequence || editTopic?.sequence}`}
        submitBtn={submitBtnObj}
        popUpState={popUpState}
        closeBtn={closeBtnObj}>
        {/* add topic form popup */}
        {!isEdit && <AddTopicForm setTopicData={setNewTopicData} topicData={newTopicData} />}

        {/* edit topic form popup containing add topic content, binge data, resources, quiz */}
        {isEdit && (
          <>
            <BlackRow
              type="large"
              title={`Topic ${editTopic?.sequence} : ${editTopic?.name}`}
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

            <div className={`${styles.topicContentContainer}`}>
              {/* edit topic form */}
              <div ref={editTopicFormRef}>
                {isEditTopicFormVisible && (
                  <>
                    <AddTopicForm setTopicData={setEditTopic} topicData={editTopic} isEdit={true} />

                    <div className="center-element-with-flex">
                      <Button
                        clickHandler={() => updateTopicAndContext()}
                        isDisabled={!isEditTopicReady}
                        text="Update"
                        type="button"
                      />
                    </div>
                  </>
                )}
              </div>

              {editTopic?.type === 'Assessment' && <AssessmentForm data={assessmentData} />}

              {editTopic?.type === 'Lab' && <div style={{ textAlign: 'center' }}>This is Labs</div>}

              {/* add topic content form section */}
              {editTopic?.type === 'Content' && (
                <>
                  {/* topic content title */}
                  <div className={`${styles.titleWithLineAtSide}`}>Content</div>

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

                  {/* subtitles accordion */}
                  {(addTopicContentLocalStates?.newTopicContent?.type === 'mp4' ||
                    filteredTopicContent[0]?.type === 'mp4') && (
                    <Accordion
                      title="Subtitles"
                      isDisabled={!filteredTopicContent?.length}
                      content={
                        <SubtitleForm
                          topicId={editTopic?.id || ''}
                          courseId={editTopic?.courseId || ''}
                        />
                      }
                    />
                  )}

                  {/* binge */}
                  {(addTopicContentLocalStates?.newTopicContent?.type === 'mp4' ||
                    filteredTopicContent[0]?.type === 'mp4') && (
                    <Accordion
                      title="Binge it"
                      isDisabled={!filteredTopicContent?.length}
                      content={<BingeForm topicVideo={topicVideo} />}
                    />
                  )}

                  {/* quiz */}
                  <Accordion
                    title="Quiz"
                    isDisabled={!filteredTopicContent?.length}
                    content={
                      <QuizForm
                        topicId={editTopic?.id || ''}
                        courseId={editTopic?.courseId || ''}
                      />
                    }
                  />
                  {/* <Accordion title="Quiz" content={<Quiz />} /> */}

                  {/* resources */}
                  <Accordion
                    title="Resources"
                    isDisabled={!filteredTopicContent?.length}
                    content={
                      <ResourcesForm
                        topicId={editTopic?.id || ''}
                        courseId={editTopic?.courseId || ''}
                      />
                    }
                  />
                </>
              )}

              {editTopic?.type === 'Classroom' && (
                <>
                  {/* topic content title */}
                  <div className={`${styles.titleWithLineAtSide}`}>Classroom</div>

                  <ClassroomForm />

                  {/* resources */}
                  <Accordion
                    title="Resources"
                    content={
                      <ResourcesForm
                        topicId={editTopic?.id || ''}
                        courseId={editTopic?.courseId || ''}
                      />
                    }
                  />
                </>
              )}
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
