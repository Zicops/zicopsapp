import styles from '../questionPaperPreview.module.scss';

const QuestionStatus = ({ qStatus }) => {
  const { attempted, unattempted, marked } = styles;
  let qStyle = '';
  switch (qStatus) {
    case 'Attempted':
      qStyle = attempted;
      break;
    case 'Unattempted':
      qStyle = unattempted;
      break;
    case 'Marked':
      qStyle = marked;
      break;
  }
  return (
    <>
      <label className={`${qStyle}`}>
        <input type="checkbox" name="checkbox" />
        {qStatus}
      </label>
    </>
  );
};

export default QuestionStatus;
