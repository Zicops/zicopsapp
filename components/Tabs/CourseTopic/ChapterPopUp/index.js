import LabeledInput from '../../../common/FormComponents/LabeledInput';

export default function ChapterPopUp({
  chapterData,
  closeModal,
  handleInput,
  isChapterAddReady,
  handleSubmit,
  isEdit = false
}) {
  return (
    <>
      <div className="add_chapter_popup">
        <div className="row">
          <div className="chapter_add">
            <div className="chapter_head">
              <div className="chapter_title">Chapter {chapterData.sequence}</div>
              <div className="chapter_cross_img">
                <img src="/images/circular-cross.png" alt="" onClick={closeModal} />
              </div>
            </div>
            <div className="chapter_body">
              <LabeledInput
                inputOptions={{
                  inputName: 'name',
                  type: 'text',
                  label: 'Chapter Name',
                  placeholder: 'Default Name to come here',
                  value: chapterData.name,
                  maxLength: 60,
                  isRequired: true
                }}
                changeHandler={handleInput}
              />
              {/* <div className="row">
                <label htmlFor="name" className="col_25" style={{ color: '#ffffff' }}>
                  Chapter Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  id="name"
                  placeholder="Default Name to come here"
                  name="name"
                  onChange={handleInput}
                  value={chapterData.name}
                  className="col_75"
                  required
                />
              </div> */}
              <div className="row">
                <label htmlFor="description" className="col_25" style={{ color: '#ffffff' }}>
                  Chapter Description
                </label>
                <textarea
                  className="col_75"
                  rows="4"
                  placeholder="Provide and outline of the course in less than 160 characters..."
                  name="description"
                  maxLength="160"
                  onChange={handleInput}
                  value={chapterData.description}
                />
              </div>
            </div>
            <div className="chapter_foot">
              {/* <AddModuleFoot  set={set} show={show}/> */}
              <div className="row">
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
                      className={isChapterAddReady ? 'btn_cancel_add' : 'btn_cancel_add_disabled'}
                      onClick={handleSubmit}
                      disabled={!isChapterAddReady}>
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
        .add_chapter_popup {
          width: 800px;
          position: fixed;
          top: 50%;
          left: 57%;
          transform: translate(-50%, -50%);
        }
        .chapter_add {
          width: 100%;
          padding: 20px;
          border-radius: 10px;
          background-color: #202222;
          opacity: 0.98;
          box-shadow: 0px 0px 20px 0px #eeeeee83, 0px 0px 100px 20px #000000;
        }
        .chapter_head {
          /* border-bottom: 1px solid rgba(109, 207, 246, 0.247) ; */
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .chapter_title {
          color: #858f8f;
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          margin: auto;
        }
        .chapter_cross_img img {
          width: 20px;
          cursor: pointer;
        }
        .chapter_body {
          min-height: 200px;
          padding: 10px;
          border: 1px solid #202222;
          border-radius: 10px;
          max-height: 52vh;
          overflow: auto;
          color: #ffffff;
        }
        .chapter_foot {
          padding: 0 20px;
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
