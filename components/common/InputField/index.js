import styles from './inputField.module.scss';

const InputField = ({ obj }) => {
  return (
    <>
      <div className="row my_30">
        <label htmlFor="name" className="col_25">
          {obj.label}
        </label>
        <input
          type={`${obj.type}`}
          name={`${obj.name}`}
          id={`${obj.id}`}
          placeholder={`${obj.placeholder}`}
          className="col_75"
          //   required
          //   onChange={inputHandler} "Enter name of the course (Upto 160 characters)"
          //   value={fullCourse.name}
        />
      </div>
    </>
  );
};

export default InputField;
