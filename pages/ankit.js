import Sidebar from '../components/Sidebar';
import MainBody from '../components/common/MainBody';
import CourseHead from '../components/CourseHead';
import QuizOptionInput from '../components/QuizOptionInput';
import MainBodyBox from '../components/common/MainBodyBox';
import McqMain from '../components/McqCard';
//import ExamFooter from '../components/common/ExamFooter';

const Ankit = () => {
  return (
    <div>
      <Sidebar />
      <MainBody>
        <CourseHead title="My Courses" />

        <MainBodyBox>
          {/* <QuizOptionInput /> */}
          {/* <ExamFooter /> */}
          <McqMain question={'Which of the following in not a java oop concept'} />
        </MainBodyBox>
      </MainBody>
    </div>
  );
};

export default Ankit;
