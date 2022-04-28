export default function ModulePopUp({
  closeModal,
  moduleData,
  isAddModuleReady,
  handleInput,
  handleSubmit,
  isEdit = false
}) {
  return (
    <>
      <div className="add_module_popup">
        <div className="row">
          <div className="module_add">
            <div className="module_head">
              <div className="module_title">Module {moduleData.sequence}</div>
              <div className="cross_img">
                <img src="/images/circular-cross.png" alt="" onClick={closeModal} />
              </div>
            </div>
            <div className="module_body">
              <div className="form_row">
                <label htmlFor="name" className="col_25" style={{ color: '#ffffff' }}>
                  Module Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  id="name"
                  placeholder="Enter name of the course (Upto 160 characters)"
                  className="col_75"
                  required
                  name="name"
                  maxLength={16}
                  onChange={handleInput}
                  value={moduleData.name}
                />
              </div>

              <div className="form_row">
                <label htmlFor="level" className="col_25" style={{ color: '#ffffff' }}>
                  Expertise Level
                </label>
                <select
                  className="col_75"
                  placeholder="Select the expertise level of the course"
                  name="level"
                  onChange={handleInput}
                  value={moduleData.level}>
                  <option hidden>Select the expertise level of the course</option>
                  <option>Beginner</option>
                  <option>Competent</option>
                  <option>Proficient</option>
                </select>
              </div>

              <div className="form_row">
                <label htmlFor="description" className="col_25" style={{ color: '#ffffff' }}>
                  Description
                </label>
                <textarea
                  className="col_75"
                  rows="4"
                  maxLength={60}
                  name="description"
                  placeholder="Brief description in less than 60 characters"
                  onChange={handleInput}
                  value={moduleData.description}
                />
              </div>

              <div className="form_row">
                <div className="col_25"></div>
                <div className="col_75">
                  <div className="chapter_section">
                    <div className="radio_btn">
                      <input
                        type="checkbox"
                        name="isChapter"
                        id="chapter-radio"
                        onChange={handleInput}
                        value={moduleData.isChapter}
                        disabled={isEdit}
                        checked={moduleData.isChapter ? 'checked' : false}
                      />
                    </div>

                    <div className="chapter">
                      <div className="chapter_head">chapterwise structure</div>
                      <div className="chapter_desc">
                        Check this if you want the module of the course to be structured chapterwise
                        or else it will be default topicwise.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      Cancel
                    </button>
                    <button
                      type="button"
                      value="add"
                      className={isAddModuleReady ? 'btn_cancel_add' : 'btn_cancel_add_disabled'}
                      onClick={handleSubmit}
                      disabled={!isAddModuleReady}>
                      {!isEdit ? 'Add' : 'Update'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      `}</style>
    </>
  );
}
