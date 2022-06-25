import styles from './questionPaperPreview.module.scss';
import QuestionPaperTop from './QuestionPaperTop';
import QuestionSection from './QuestionSection';

const NewQuestionPaperPreview = ({
  setIsQuestion,
  setOption,
  data,
  setData,
  current,
  setCurrent
}) => {
  return (
    <>
      <div className={`${styles.paperContainer}`}>
        <QuestionPaperTop setIsQuestion={setIsQuestion} data={data} />
        <QuestionSection
          setIsQuestion={setIsQuestion}
          setOption={setOption}
          data={data}
          setData={setData}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
};

export default NewQuestionPaperPreview;
