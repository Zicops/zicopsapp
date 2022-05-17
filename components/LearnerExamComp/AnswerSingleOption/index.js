import styles from './answerSingleOption.module.scss';

const AnswerSingleOption = ({ optionData, currentData,  option, setOption }) => {
  return (
    <div className={`${styles.answer_single_option}`} onClick={() => {setOption(optionData.id)}}>
      <span className={`${styles.answer_single_option_count}`}>{optionData.id.toUpperCase()} : </span>
      <div className={`${styles.answer_single_option_info} ${option === optionData.id ? styles.answer_single_option_info_selected : ''}`}>
          {
              optionData.image && (
                  <div className={`${styles.answer_single_option_img_container}`}>
                      <img
                          className={` ${styles.answer_single_option_img} `}
                          src={`${optionData.image}`}
                          alt="refresh"
                      />
                  </div>
              )
          }
          <p>{optionData.text}</p>
      </div>
    </div>
  );
};

export default AnswerSingleOption;
