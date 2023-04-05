import styles from './deletePopUp.module.scss'
const DeletePoUp=({poUpOptions})=>
{
    const {popUpName,popUpNotice,poupBtnInfo1,poupBtnInfo2}=poUpOptions;
    // const {btn1,btn2}=styleBtns
    return(
        <div className={`${styles.deletePopUpContainer}`}>
          <div className={`${styles.deletePoupInnerContainer}`}>
            <p>Delete {popUpName}</p>
            <div className={`${styles.deletePopUpNotice}`}>
                {popUpNotice}
            </div>
            <div className={`${styles.deletePoupBtn}`}>
                <button >{poupBtnInfo1}</button>
                <button >{poupBtnInfo2}</button>
            </div>
          </div>
        </div>
    )
};
export default DeletePoUp;