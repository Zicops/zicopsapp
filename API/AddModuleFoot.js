import styles from '../styles/CourseMaster.module.css';

const AddModuleFoot = ({set, show}) => {
    const modalClose = () => set(false);
    const moduleAdd = () => {
        show(true)
        set(false)
      }
    return (
        <div className={styles.row}>
            <div className={styles.col_25}></div>
            <div className={styles.col_75}>
                <div className={styles.button_container}>
                    <button type="button" value="cancel" className={styles.btn_cancel_add} onClick={modalClose}>Cancel</button>
                    <button type="button" value="add" className={styles.btn_cancel_add} onClick={moduleAdd}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddModuleFoot