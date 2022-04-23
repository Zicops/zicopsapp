import QuizCheckBox from '../QuizCheckBox';
import styles from './quizInput.module.scss';

const QuizInput = ({ type = 'question', sr, text }) => {
  //destructuring the different key value pairs from the css module and using them.
  const { option, question } = styles;
  //just to check if our input component is working or not
  //const check = { type: 'option', text: 'hey there', sr: 'Q' };
  const sclass = type === 'question' ? question : option;
  const hide = sclass === question ? 'none' : '';

  return (
    <>
      <div className={sclass}>
        <div className={`${styles.checkBox}`} style={{ display: `${hide}` }}>
          <div className={styles.number}>
            <span>{`${sr}.`}</span>
          </div>
          <div>
            <QuizCheckBox />
          </div>
        </div>
        <div className={styles.box}>
          <input type="text" className="" placeholder={text} />

          <div className={styles.attachment}>
            <div>
              <span className={`${styles.one}`}>
                <img src="/images/attachment.png" alt="" />
              </span>
            </div>
            <div className={styles.innerBox}>
              <span>
                <img src="/images/img.png" alt="" />
                Image
              </span>
              <span>
                <img src="/images/audio.png" alt="" />
                Audio
              </span>
              <span>
                <img src="/images/vid.png" alt="" />
                Video
              </span>

              <input type="file" name="quiz_attachment" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizInput;
