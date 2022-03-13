import styles from '../styles/CourseMaster.module.css';

const AddModuleFoot = ({set, show}) => {
    const modalClose = () => set(false);
    const moduleAdd = () => {
        show(true)
        set(false)
      }
    return (
        <>
        <div className={styles.row}>
            <div className={styles.col_25}></div>
            <div className={styles.col_75}>
                <div className={styles.button_container}>
                    <button type="button" value="cancel" className="btn_cancel_add" onClick={modalClose}>Cancel</button>
                    <button type="button" value="add" className="btn_cancel_add_disabled" onClick={moduleAdd}>Add</button>
                </div>
            </div>
        </div>
        <style jsx>{`
        .btn_cancel_add{
            width: 150px;
            height: 40px;
            background-color:#202222;
            border:2px solid #858f8f ;
            color:#858f8f;
            cursor: pointer;
            margin-right: 15px;
            text-transform: capitalize;
            font-size: 15px;
        }
        .btn_cancel_add_disabled{
            width: 150px;
            height: 40px;
            background-color:#202222;
            border:2px solid #858f8f ;
            color:#858f8f;
            cursor: pointer;
            margin-right: 15px;
            text-transform: capitalize;
            font-size: 15px;
            opacity: 0.5;
        }
        .btn_cancel_add:hover{
            border-color: #ffffff; 
            color:#ffffff;
            background-color: #1a1a1a;
        }
        `}</style>
        </>
    )
}

export default AddModuleFoot