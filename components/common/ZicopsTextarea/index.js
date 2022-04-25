const ZicopsTextarea = ({ text, placeholder }) => {
  return (
    <>
      <div className="zicops_textarea my_30">
        <label>{text}</label>
        <div className="row">
          <textarea
            name=""
            id=""
            cols="130"
            rows="4"
            placeholder={placeholder}
            className="textarea"></textarea>
        </div>
      </div>
    </>
  );
};

export default ZicopsTextarea;
