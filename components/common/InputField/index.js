import styles from './inputField.module.scss';

const InputField = ({ obj }) => {
  let inputSize, labelSize;
  if (obj.label === '') {
    inputSize = styles.col_100;
    labelSize = styles.col_zero;
  } else {
    inputSize = 'col_75';
    labelSize = styles.col_25;
  }
  return (
    <>
      <div className={`row ${styles.container} `}>
        <label htmlFor={`${obj.name}`} className={`${labelSize}`}>
          {obj.label}
        </label>
        <input
          type={`${obj.type}`}
          name={`${obj.name}`}
          id={`${obj.id}`}
          placeholder={`${obj.placeholder}`}
          className={`${inputSize}`}
          //   required
          //   onChange={inputHandler} "Enter name of the course (Upto 160 characters)"
          //   value={fullCourse.name}
        />
      </div>
    </>
  );
};

export default InputField;
