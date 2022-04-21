import { useContext, useEffect } from 'react';
import { filterTopicContent } from '../../../helper/data.helper';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import Quiz from '../../medium/Quiz';
import Accordion from '../../small/Accordion';
import Binge from '../Binge';
import ModuleBlock from '../ModuleBlock';
import Resources from '../Resources';
import TopicContentView from '../TopicContentView';

export default function EditTopicPopUp({
  inputHandlers,
  topicData,
  closeModal,
  isTopicAddReady,
  isFormVisible,
  toggleForm,
  saveAllData,
  bingeData,
  newTopicContent = {},
  newTopicContentVideo = {},
  newTopicContentSubtitle = {}
}) {
  const { handleInput, handleTopicVideo, handleTopicSubtitle, addNewCourseContent } = inputHandlers;

  const { topicContent, topicVideo, topicSubtitle } = useContext(moduleContext);
  const filteredTopicContent = filterTopicContent(topicContent, topicData.id);

  useEffect(() => {
    toggleForm(!filteredTopicContent.length);
  }, []);

  console.log('topcicontentdata', newTopicContent, topicContent, isFormVisible);

  return (
    <>
      <div className="add_module_popup">
        <div className="row my_30">
          <div className="module_add">
            <div className="module_head">
              <div className="module_title">Topic {topicData.sequence}</div>
              <div className="cross_img">
                <img src="/images/circular-cross.png" alt="" onClick={closeModal} />
              </div>
            </div>

            <div className="topicAdded">
              <ModuleBlock
                type="module"
                title={`Topic ${topicData.sequence} : ${topicData.name}`}
                editHandler={() => {
                  togglePopUp('addTopic', true);
                  console.log('sssss');
                }}
              />
            </div>
            <div className="chapter_body">
              <div className="row my_30">
                <div className="topic_title">Content</div>
              </div>

              {isFormVisible && (
                <>
                  <div className="row my_30">
                    <div className="col_25"></div>
                    <div className="col_50">
                      <div className="checkbox_mark">
                        <label className="checkbox_container">
                          <input type="checkbox" />
                          <span className="checkmark"></span>is Default
                        </label>
                      </div>
                    </div>
                    <div className="col_25"></div>
                  </div>

                  <div className="form_row">
                    <label htmlFor="language" className="col_25">
                      Select Language
                    </label>
                    <select
                      className="col_75"
                      name="language"
                      onChange={handleInput}
                      value={newTopicContent.language || ''}>
                      <option hidden>Language of the content</option>
                      {['English', 'Hindi', 'Bengali', 'Marathi'].map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form_row">
                    <label htmlFor="name1" className="col_25">
                      Type of content
                    </label>
                    <select
                      className="col_75"
                      name="type"
                      onChange={handleInput}
                      value={newTopicContent.type}>
                      <option hidden>Type of content</option>
                      {['SCORM', 'TinCan', 'Web HTML5', 'mp4', 'CMi5'].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form_row">
                    <label htmlFor="name3" className="col_25">
                      Upload Content
                    </label>
                    <div className="col_75">
                      <div className="upload_btn_wrapper">
                        <button className="btn">
                          <span className="input_icon">
                            <span>
                              <img src="/images/upload.png" alt="" />
                            </span>
                          </span>
                          Browse & upload
                        </button>
                        <input
                          type="file"
                          name="upload_content"
                          onChange={handleTopicVideo}
                          accept={`.${newTopicContent.type}`}
                        />
                        <div id="upload_content">
                          {newTopicContentVideo.file ? newTopicContentVideo.file.name : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form_row">
                    <label htmlFor="name1" className="col_25">
                      Duration
                    </label>
                    <input
                      className="col_50"
                      type="text"
                      name="duration"
                      disabled
                      onChange={handleInput}
                      value={newTopicContent.duration}
                    />
                    <div className="col_25">seconds</div>
                  </div>

                  <div className="form_row">
                    <label htmlFor="name3" className="col_25">
                      Upload Subtitle
                    </label>
                    <div className="col_75">
                      <div className="upload_btn_wrapper">
                        <button className="btn">
                          <span className="input_icon">
                            <span>
                              <img src="/images/upload.png" alt="" />
                            </span>
                          </span>
                          Browse & upload
                        </button>
                        <input type="file" name="subtitle" onChange={handleTopicSubtitle} />
                        <div id="subtitle">
                          {newTopicContentSubtitle.file ? newTopicContentSubtitle.file.name : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form_row">
                    <button
                      type="button"
                      value="add"
                      className="button_single"
                      onClick={addNewCourseContent}>
                      Add
                    </button>
                  </div>
                </>
              )}

              {filteredTopicContent && !!filteredTopicContent.length && (
                <>
                  {filteredTopicContent.map((content, index) => (
                    <TopicContentView
                      topicContent={content}
                      isSubtitleAdded={
                        topicSubtitle[index]?.file || topicSubtitle[index]?.subtitleUrl
                      }
                      key={content.id || index}
                    />
                  ))}

                  <button className="transparent_button" onClick={toggleForm}>
                    <span>
                      <img src="/images/plus.png" alt="" />
                    </span>
                    <span>Add Language</span>
                  </button>
                </>
              )}

              <Accordion
                title="Binge it"
                content={
                  <Binge
                    video={topicVideo}
                    handleInput={handleInput}
                    topicContent={topicContent}
                    bingeData={bingeData}
                  />
                }
              />
              <Accordion title="Quiz" content={<Quiz />} />
              <Accordion title="Resources" content={<Resources topicId={topicData.id || ''} />} />
            </div>

            <div className="module_foot">
              <div className="form_row">
                <div className="col_25"></div>
                <div className="col_75">
                  <div className="button_container">
                    <button
                      type="button"
                      value="cancel"
                      className="btn_cancel_add"
                      onClick={closeModal}>
                      Design Later
                    </button>

                    <button
                      type="button"
                      className={isTopicAddReady ? 'btn_cancel_add' : 'btn_cancel_add_disabled'}
                      onClick={() => {
                        saveAllData();
                      }}>
                      Design
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add to .scss */}
      <style jsx>
        {`
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
          .module_foot {
            padding: 30px;
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

          .transparent_button {
            background-color: transparent;
            color: #868f8f;
            font-family: 'Open Sans';
            border: none;

            cursor: pointer;
            transition: all 0.3s;

            display: flex;
            margin-left: auto;
          }
          .transparent_button:hover {
            color: #ffffff;
          }
          .transparent_button span img {
            width: 13px;
            height: 13px;
            margin-right: 10px;
          }
        `}
      </style>
    </>
  );
}
