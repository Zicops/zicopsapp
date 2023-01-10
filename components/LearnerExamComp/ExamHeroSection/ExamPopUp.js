import styles from './popUp.module.scss';
import 'reactjs-popup/dist/index.css';
const ExamPopUp = ({title,children , closePopUp }) => {
    return (
    <div className={`${styles.popUpContainer}`}>
          <div className={`${styles.popUp}`}>
            <div className={`${styles.header}`}>
                    <div className={`${styles.title}`}>{title} </div>
                    <div
                className={`${styles.cross_img}`}
                onClick={closePopUp}>
                  <img src="/images/svg/cross.svg" alt="" />
              </div>
            </div>
            <div className={`${styles.body}`}>{children}</div>
          </div>
        </div>
  )
}

export default ExamPopUp