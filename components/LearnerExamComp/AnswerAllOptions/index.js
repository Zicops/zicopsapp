import AnswerSingleOption from "../AnswerSingleOption"
import styles from './answerAllOptions.module.scss'

const AnswerAllOptions = () => {
 
  const answerData = {
    option: 'A',
  };
  answerData.src = '/images/courses/1.png';

  return (
    <>
    <div className={`${styles.answer_all_options}`} >
      <AnswerSingleOption  optionprop={answerData}/>
      <AnswerSingleOption  optionprop={{...answerData, option:'B',answer:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, similique recusandae? ', src:undefined}}/>
      
      <AnswerSingleOption  optionprop={{...answerData, option:'C',answer:'Parrot',src:undefined}}/>
      <AnswerSingleOption  optionprop={{...answerData, option:'D',src:'/images/Back.png'}}/>
    </div>
    <div className={`${styles.answer_all_options_buttons_container}`}>
      <button className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_clear}`}>Clear<span>all options</span></button>
      <button className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_unmark}`}>Unmark<span>from review</span></button>
      <button className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_previous}`}>Previous<span>Question</span></button>
      <button className={`${styles.answer_all_options_button} ${styles.answer_all_options_button_next}`}>Next<span>Question</span></button>
    </div>
    </>
  )
}

export default AnswerAllOptions