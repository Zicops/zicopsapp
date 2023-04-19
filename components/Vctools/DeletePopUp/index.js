import styles from './deletePopUp.module.scss'
const DeletePopUp=({poUpOptions,cancelFunc,deletePollFunc,styleBtns})=>
{
    const {popUpName,popUpNotice,poupBtnInfo1,poupBtnInfo2}=poUpOptions;
    const {cancelPopupClass,deletePopupclass}=styleBtns
    return(
        <div className={`${styles.deletePopUpContainer}`}>
          <div className={`${styles.deletePoupInnerContainer}`}>
            <p>Delete {popUpName}</p>
            <div className={`${styles.deletePopUpNotice}`}>
                {popUpNotice}
            </div>
            <div className={`${styles.deletePoupBtn}`}>
                <button onClick={()=> cancelFunc()} className={cancelPopupClass}>{poupBtnInfo1}</button>
                <button onClick={()=>deletePollFunc()} className={deletePopupclass} >{poupBtnInfo2}</button>
            </div>
          </div>
        </div>
    )
};
export default DeletePopUp;