// import styles from './ExamConfigration.module.scss';
import SwitchButton from '../../common/SwitchButton';
// import InputField from '../../common/InputField';
const ExamConfigration = () => {
  return (
    <>
      <div className={`ExamConfigration`}>
        <SwitchButton text={'Question Shuffling'} />
        <SwitchButton text={'Display Answer Hints'} />
        <SwitchButton text={'Show right Answers on finish'} />
        <SwitchButton text={'Show result on finish'} />
        {/* <InputField /> */}
      </div>
      <style>{`
          .ExamConfigration{
            display: grid;
            justify-content: spaec-around;
            justify-items: start;
            grid-template-columns: auto auto;
            align-content: center;
            // border:1px solid white;
            min-height:200px;
            padding-left:50px;
          }`}</style>
    </>
  );
};

export default ExamConfigration;
