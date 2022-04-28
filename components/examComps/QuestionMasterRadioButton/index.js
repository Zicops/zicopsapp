import ZicopsRadioButton from '../../common/ZicopsRadioButton';
const QuestionMasterRadioButton = ({ onRadioChanged }) => {
  return (
    <>
      <div className="row">
        <div className="col_25"></div>
        <div className="col_75">
          <span style={{ marginRight: '10%' }}>
            <ZicopsRadioButton
              prop={{ name: 'zexam', text: 'Create Question', value: 'create' }}
              onRadioChanged={onRadioChanged}
            />
          </span>
          <span>
            <ZicopsRadioButton
              prop={{ name: 'zexam', text: 'Upload Question', value: 'upload' }}
              onRadioChanged={onRadioChanged}
            />
          </span>
        </div>
      </div>
      <style jsx>{`
        .col_75 {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default QuestionMasterRadioButton;
