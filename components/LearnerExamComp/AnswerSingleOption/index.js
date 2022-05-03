import styles from './answerSingleOption.module.scss';

const AnswerSingleOption = ({ optionprop }) => {
  return (
    <div className={`${styles.answer_single_option}`}>
      <span className={`${styles.answer_single_option_count}`}>{optionprop.option} : </span>
      <div className={`${styles.answer_single_option_info}`}>
        {optionprop.src === undefined ? (
          <p>{optionprop.answer}</p>
        ) : (
          <div className={`${styles.answer_single_option_img_container}`}>
            <img
              className={` ${styles.answer_single_option_img} `}
              src={`${optionprop.src}`}
              alt="refresh"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerSingleOption;
