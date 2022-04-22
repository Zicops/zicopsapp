const Marks = ({ label, placeholder }) => {
  return (
    <>
      <div className="row mb_10">
        <label htmlFor="name" className="col_25">
          {label}
        </label>
        <input type="text" name="text" placeholder={placeholder} />
      </div>
    </>
  );
};

export default Marks;
