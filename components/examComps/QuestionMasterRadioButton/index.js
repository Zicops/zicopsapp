import ZicopsRadioButton from '../../common/ZicopsRadioButton';
const QuestionMasterReadioButton = () => {
  return (
    <>
      <div className="row">
        <div className="col_25"></div>
        <div className="col_75">
          <span style={{ marginRight: '10%' }}>
            <ZicopsRadioButton text={'Create Question'} />
          </span>
          <span>
            <ZicopsRadioButton text={'Upload Questions'} />
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

export default QuestionMasterReadioButton;
