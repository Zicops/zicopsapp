import AnswerSingleOption from "../AnswerSingleOption"
import styles from './answerAllOptions.module.scss'
import {useEffect, useState} from "react";

const AnswerAllOptions = ({data, setData, current, setCurrent}) => {

  const [option, setOption] = useState(current?.selectedOption);
  const [nextTrigger, setNextTrigger] = useState(false);
  const [previousTrigger, setPreviousTrigger] = useState(false);
  const [markTrigger, setMarkTrigger] = useState(false);
  const [mark, setMark] = useState(false);

  const handleChange = (temp) => {
    return data.map(function (obj) {
      if (obj.id === current.id) {
        return {
          ...obj,
          selectedOption: option,
        };
      }
      else if (obj.id === current.id + temp) {
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
  const handleMarked = () => {
    return data.map(function (obj) {
      if (obj.id === current.id) {
        return {
          ...obj,
          isMarked: mark,
        };
      } else {
        return {...obj};
      }
    });
  }
  // const changeVisited = (temp) => {
  //   return data.map(function (obj) {
  //     if (obj.id === current.id + temp) {
  //       return {
  //         ...obj,
  //         isVisited: true,
  //       };
  //     } else {
  //       return {...obj};
  //     }
  //   });
  // }


  useEffect(() => {
    if(nextTrigger){
      setData(handleChange(1));
      // setData(changeOption());
      if(data.length !== current.id)
        setCurrent(data.filter(each => each.id === (current.id + 1))[0])
      setNextTrigger(false);
    }
    if(previousTrigger){
      // setData(changeOption());
      setData(handleChange(-1));
      if(current.id !== 1)
        setCurrent(data.filter(each => each.id === (current.id - 1))[0])
      setPreviousTrigger(false);
    }
    if(markTrigger){
      setData(handleMarked());
      // setData(changeMarked());
      setMarkTrigger(false)
    }
    if(current.id !== 0 && data.length !== current.id){
      setOption(current?.selectedOption)
    }
  }, [nextTrigger, previousTrigger, markTrigger])

  useEffect(() => {
    setMark(current?.isMarked || false)
  }, [current])

  return (
    <>
    <div className={`${styles.answer_all_options}`} >
      {
        data[current.id - 1].options.map((each) => (
            <AnswerSingleOption currentData={current} optionData={each} option={option} setOption={setOption}/>
        ))
      }
    </div>
    <div className={`${styles.answer_all_options_buttons_container}`}>
      <button onClick={() => {
        setOption(null)
      }} className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_clear}`}>Clear<span>all options</span></button>
      <button onClick={() => {
        setMark(!mark)
        setMarkTrigger(true);
      }} className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_unmark}`}>{mark ? 'Unmark' : 'Mark'}<span>from review</span></button>
      <button onClick={() => {
        setPreviousTrigger(true)
      }} className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_previous}`} >Previous<span>Question</span></button>
      <button onClick={() => {
        // console.log(option)
        setNextTrigger(true)
      }} className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_next}`}>Next<span>Question</span></button>
    </div>
    </>
  )
}

export default AnswerAllOptions