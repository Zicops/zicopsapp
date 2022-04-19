import Sidebar from '../../components/large/Sidebar';
import MainBody from '../../components/common/MainBody';
import MainBodyBox from '../../components/common/MainBodyBox';
// import SwitchButton from '../../components/common/SwitchButton';
import ExamConfigration from '../../components/examComps/ExamConfigration';
import ExamDatePicker from '../../components/common/ExamDatePicker';
const Exam = () => {
  return (
    <>
      <Sidebar />
      <MainBody>
        <MainBodyBox>
          {/* <div className={`ExamConfigration`}>
            <SwitchButton text={'Question Shuffling'} />
            <SwitchButton text={'Display Answer Hints'} />
            <SwitchButton text={'Show right Answers on finish'} />
            <SwitchButton text={'Show result on finish'} />
          </div> */}
          <ExamConfigration />
          <ExamDatePicker text={'Exam Date'} />
        </MainBodyBox>
      </MainBody>
      {/* <style>{`
          .ExamConfigration{
              display: grid;
                justify-content: spaec-around;
                justify-items: start;
                grid-template-columns: auto auto;
                align-content: center;
                border:1px solid white;
                height:200px;
                padding-left:50px;
          }`}</style> */}
    </>
  );
};

export default Exam;
