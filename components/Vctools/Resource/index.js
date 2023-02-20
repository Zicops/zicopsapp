import styles from "../vctoolMain.module.scss"
const ResourcePage=({showHide})=>
{
    return(
        <div className={`${styles.Resourcebar}`}>
            <div className={`${styles.Resource_head}`}>
                <div>Resources</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>
            
            <div className={`${styles.Resource_screen}`}>
            <div className={`${styles.Resource_screen_head}`}>All files</div>


            </div>
          
        </div>
    )
};
export default ResourcePage;