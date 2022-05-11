import styles from '../../customVideoPlayer.module.scss';
import Image from 'next/image';

export default function Quiz({ playerClose, handleSkip, handleSubmit }) {
  return (
    <div className={`${styles.quizContainer}`}>
      <div className={`${styles.firstIcon}`} onClick={playerClose}>
        <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
      </div>
      <div>Question</div>

      <div>answers</div>

      <div className={`${styles.footerBtns}`}>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    </div>
  );
}
