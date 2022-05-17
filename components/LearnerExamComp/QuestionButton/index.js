import styles from './questionButtonStyles.module.scss';
import {useEffect, useState} from "react";

const QuestionButton = ({each, data, setData, current, setCurrent}) => {
  const { question_button_marked , question_button_attempted , question_button_unattempted, question_button_notVisited, question_button_current} = styles ;
  let classNameBe ;
  if(each.isVisited===false) {
    classNameBe = question_button_notVisited
  }else if(each.isVisited===true && each.isMarked){
      classNameBe=question_button_marked ;
  }else if(each.isVisited===true && each.selectedOption){
      classNameBe=question_button_attempted ;
  }else if(each.isVisited === true){
    classNameBe= question_button_unattempted ;
  }

  const [trigger, setTrigger] = useState(false);

  const handleChange = () => {
    return data.map(function (obj) {
      if (obj.id === current.id) {
        return {
          ...obj,
          isVisited: true,
        };
      }
      else {
        return {...obj};
      }
    });
  }

  useEffect(() => {
    if(trigger){
      setCurrent(data.filter(e => e.id === (each.id))[0])
      setData(handleChange());
    }
  }, [trigger])

  return (
    <>
      <button onClick={() => {
        setTrigger(true)
      }} className={`${styles.question_buttons} ${classNameBe} ${current.id === each.id ? styles.question_button_current : ''} `}>{each.id}</button>
    </>
  );
};

export default QuestionButton;
