import styles from './questionButtonStyles.module.scss';
import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import ToolTip from '@/components/common/ToolTip';

const QuestionButton = ({each, data, setData, current, setCurrent, setOption, filterData, setIsQuestion}) => {
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

  // const [trigger, setTrigger] = useState(false);

  const handleChange = () => {
    return data.map(function (obj) {
      if (obj.id === each.id) {
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

  // useEffect(() => {
  //   if(trigger){
  //     setCurrent(data.filter(e => e.id === (each.id))[0])
  //     setData(handleChange());
  //   }
  // }, [trigger])

  return (
    <>
      {/*<Grid item lg={2.4} md={2.4} sm={2.4} xs={2.4} display={'flex'} justifyContent={'center'} alignItems={'center'}>*/}
      {/*</Grid>*/}
      <ToolTip title={`Go to question number ${each.id}`} placement="top">
      <button onClick={() => {
        setCurrent(data.filter(e => e.id === (each.id))[0])
        setData(handleChange());
        setOption(data?.filter(e => e.id === (each.id))[0]?.selectedOption)
        setIsQuestion(false);
        // setTrigger(true)
      }} className={`${styles.question_buttons} ${classNameBe} ${current.id === each.id ? styles.question_button_current : ''} `}>{each.id}
      </button>
      </ToolTip>
    </>
  );
};

export default QuestionButton;
