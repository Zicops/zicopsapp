import styles from './chat.module.scss';
const ChatHead = ({company_logo , company_name , company_type , company_training_type , company_work }) => {
    return (
        <div  className={`${styles.chatHead_Conatiner}`}>
        <div className={`${styles.chatHead_main}`}>
          <div className={`${styles.back_image}`}>
              <img src="/images/svg/arrow_back.svg" alt="" />
          </div>
          <div className={`${styles.company_details}`}>
              <div className={`${styles.company_logo}`}>
                <img src={company_logo} alt="" />  
              </div>
              <div className={`${styles.company_about}`}>
              <p>{company_name}</p>
              <span>{company_type}</span> <span>|</span> <span>{company_training_type}</span> <span>|</span> <span>{company_work}</span>
                    </div>
            </div>
            </div>
             <div className={`${styles.hr}`}></div>
            </div>
  )
}

export default ChatHead