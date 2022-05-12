import LabeledInput from '../../../../common/FormComponents/LabeledInput';

export default function AddTopicForm({ handleInput, topicData, isEdit = false }) {
  console.log(topicData);
  return (
    <>
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          type: 'text',
          label: 'Topic Name',
          placeholder: 'Enter topic name ( in less than 60 characters )',
          value: topicData.name,
          maxLength: 60,
          isRequired: true
        }}
        changeHandler={handleInput}
      />
      {/* <div className="form_row">
        <label htmlFor="name" className="col_25" style={{ color: '#ffffff' }}>
          Topic Name
        </label>
        <input
          type="text"
          autoComplete="name"
          id="name"
          placeholder="Enter topic name ( in less than 20 characters )"
          className="col_75"
          required
          name="name"
          onChange={handleInput}
          value={topicData.name}
        />
      </div> */}
      <div className="form_row">
        <label htmlFor="description" className="col_25" style={{ color: '#ffffff' }}>
          Description
        </label>
        <textarea
          className="col_75"
          rows="4"
          name="description"
          maxLength="160"
          placeholder="Brief description in less than 160 characters"
          onChange={handleInput}
          value={topicData.description}
        />
      </div>

      {!isEdit && (
        <div className="form_row">
          <label htmlFor="name1" className="col_25" style={{ color: '#ffffff' }}>
            Topic Type
          </label>
          <select className="col_75" name="type" onChange={handleInput} value={topicData.type}>
            <option hidden>Select topic type</option>
            <option>Content</option>
            <option>Lab</option>
            <option>Assessment</option>
          </select>
        </div>
      )}

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
