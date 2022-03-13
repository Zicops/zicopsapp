import styles from '../styles/CourseMaster.module.css';

const AddModuleBody = () => {
    return (
        <>
            <div className={styles.form_row}>
                <label htmlFor="name" className={styles.col_25} style={{color: '#ffffff'}}>Module Name</label>
                <input type="text" autoComplete="name" id="name" placeholder="Enter name of the course (Upto 160 characters)" className={styles.col_75} required />
            </div>
            <div className={styles.form_row}>
                <label htmlFor="name1" className={styles.col_25} style={{color: '#ffffff'}}>Expertise Level</label>
                <select className={styles.col_75} placeholder="Select the category of the course">
                    <option hidden>Select the category of the course</option>
                    <option>Beginner</option>
                    <option>Competent</option>
                    <option>Proficient</option>
                </select>
            </div>
            <div className={styles.form_row}>
                <label htmlFor="description" className={styles.col_25} style={{color: '#ffffff'}}>Description</label>
                <textarea className={styles.col_75} rows="4" name="description" placeholder="Brief description in less than 60 characters" 
                onChange=""
                value=""/>
            </div>

            <div className={styles.row}>
                <div className={styles.col_25}></div>
                <div className={styles.col_75}>
                    <div className={styles.chapter_section}>
                        <div className={styles.radio_btn}>
                            <input type="checkbox" name="chapter-radio" id="chapter-radio" />
                        </div>
                        <div className={styles.chapter}>
                            <div className={styles.chapter_head}>
                                chapterwise structure
                            </div>
                            <div className={styles.chapter_desc}>
                                Check this radio button if you want the module of the course to be structured
                                chapterwise or else it will be default topicwise.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                
                `}
            </style>
        </>
    )
}

export default AddModuleBody