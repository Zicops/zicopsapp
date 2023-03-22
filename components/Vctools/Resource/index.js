import styles from "../vctoolMain.module.scss"
const ResourcePage=({hide=false})=>
{
    return(
        <div className={`${styles.resourceBar}`}>
            <div className={`${styles.resourceHead}`}>
                <div>Resources</div>
                <button onClick={() => {
                    hide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>
            
            <div className={`${styles.resourceScreen}`}>
            <div className={`${styles.resourceScreenhead}`}>All files</div>


            </div>
          
        </div>
    )
};
export default ResourcePage;