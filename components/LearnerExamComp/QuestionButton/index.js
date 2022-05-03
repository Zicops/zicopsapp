import styles from './questionButtonStyles.module.scss';

const QuestionButton = ({ data,check }) => {
  const { question_button_marked , question_button_attempted , question_button_unattempted} = styles ;
  let classNameBe ;
  if(check==='marked'){
    classNameBe= question_button_marked ;
  }else if(check==='attempted'){
    classNameBe=question_button_attempted ;
  }else{
    classNameBe= question_button_unattempted ;
  }

  console.log(classNameBe);

  return (
    <>
      <button className={`${styles.question_buttons} ${classNameBe} `}>{data}</button>
    </>
  );
};

export default QuestionButton;
