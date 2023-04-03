import styles from "../vctoolMain.module.scss"
const CreateResource = ({addResource}) => {
    return (
        <div className={`${styles.resourceModeratorContainer}`}>

            <div className={`${styles.resourceModeratorScreen}`}>
                <div className={`${styles.moderatorAddResource}`}>
                    <div className={styles.recourceIcon}><img src='/images/svg/vctool/library-books.svg' /></div>
                    <div className={`${styles.resourceAvailableHead}`}>No resources available!</div>
                    <p className={`${styles.resourceAvailablesubHead}`}>Click below to add resources</p>
                </div>
            </div>
            <button className={`${styles.addResourceBtn}`} onClick={() => {
                addResource()
            }}><div>+</div>Add Resource</button>
        </div>
    )
};
export default CreateResource;