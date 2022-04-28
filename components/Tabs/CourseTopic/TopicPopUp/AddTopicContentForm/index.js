export default function AddTopicContentForm({
  inputHandlers,
  data,
  addNewTopicContent,
  isAddTopicContentReady
}) {
  const { newTopicContent, newTopicVideo, newTopicSubtitle } = data;
  const { handleTopicContentInput, handleTopicSubtitleInput, handleTopicVideoInput } =
    inputHandlers;

  return (
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
          onChange={handleTopicContentInput}
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
          onChange={handleTopicContentInput}
          value={newTopicContent.type}>
          <option hidden>Type of content</option>
          {['SCORM', 'TinCan', 'Web HTML5', 'mp4', 'CMi5'].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {newTopicContent.type === 'mp4' ? (
        <>
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
                  onChange={handleTopicVideoInput}
                  accept={`.${newTopicContent.type}`}
                />
                <div id="upload_content">{newTopicVideo.file ? newTopicVideo.file.name : ''}</div>
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
              onChange={handleTopicContentInput}
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
                <input type="file" name="subtitle" onChange={handleTopicSubtitleInput} />
                <div id="subtitle">{newTopicSubtitle.file ? newTopicSubtitle.file.name : ''}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="form_row">
        <button
          type="button"
          value="add"
          className={isAddTopicContentReady ? 'button_single' : 'btn_disable'}
          onClick={addNewTopicContent}
          disabled={!isAddTopicContentReady}>
          Add
        </button>
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
          .btn_disable {
            padding: 10px 40px;
            background-color: transparent;
            color: #858f8f;
            border: 1px solid #303131;
            border-radius: 35px;
            margin: auto;
            margin: 10px;

            cursor: no-drop;
            opacity: 0.5;
          }
        `}
      </style>
    </>
  );
}
