const CheckBoxField = ({ checkBox_label }) => {
  return (
    <>
      <div className="checkBox_field">
        <label className="checkbox_container">
          <input type="checkbox" name="expertise_level" value="Beginner" />
          <span className="checkmark"></span>
          {checkBox_label}
        </label>
      </div>
      <style>{`
      .checkbox_container {
            // display: block;
            // position: relative;
            padding-left: 35px;
            cursor: pointer;
            font-size: 14px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .checkmark {
            // position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            background-color: #202222;
            border: 2px solid #6bcfcf;
           
        }
        .checkbox_container .checkmark:after {
            left: 5px;
            top: 1px;
            width: 5px;
            height: 10px;
            border: solid #6bcfcf;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
        }
        .checkbox_container input:checked~.checkmark {
            background-color: #202222;
            border:2px solid #6bcfcf;
        }
            `}</style>
    </>
  );
};

export default CheckBoxField;
{
  /* <div class="col_25"><label class="checkbox_container"><input type="checkbox" name="expertise_level" value="Beginner" checked=""><span class="checkmark"></span>Beginner</label></div> */
}
