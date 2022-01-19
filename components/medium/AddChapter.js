import AddModuleFoot from '../../API/AddModuleFoot';
import styles from '../../styles/CourseMaster.module.css';

const AddChapter = () => {
    return (
        <div className={styles.row}>
            <div className={styles.chapter_add}>
                <div className={styles.chapter_head}>
                    <div className={styles.chapter_title}>
                        Chapter 1
                    </div>
                    <div className={styles.chapter_cross_img}>
                        <img src="/images/circular-cross.png" alt="" />
                    </div>
                </div>
                <div className={styles.chapter_body}>
                    <div className={styles.row}>
                        <label htmlFor="name" className={styles.col_25}>Chapter Name</label>
                        <input type="text" autoComplete="name" id="name" placeholder="Default Name to come here" className={styles.col_75} required />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="name1" className={styles.col_25}>Chapter Description</label>
                        <textarea class={styles.col_75} rows="4" placeholder="Provide and outline of the course in less than 1000 characters..." />
                    </div>
                </div>
                <div className={styles.chapter_foot}>
                    <AddModuleFoot />
                </div>
            </div>
        </div>
    )
}
export default AddChapter