import AddModuleFoot from '../API/AddModuleFoot';
import styles from '../styles/CourseMaster.module.css';

const AddTopic = ({set, show}) => {
    const modalClose = () => set(false);
    return (
        <div style={{ width: '800px', position: 'fixed', top: '50%', left: '57%', transform: 'translate(-50%, -50%)' }}>
            <div className={styles.row}>
                <div className={styles.topic_add}>
                    <div className={styles.chapter_head}>
                        <div className={styles.chapter_title}>
                            Topic 1
                        </div>
                        <div className={styles.chapter_cross_img}>
                            <a className="close" onClick={close}>
                                <img src="/images/circular-cross.png" alt="" onClick={modalClose}/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.chapter_body}>
                        <div className={styles.row}>
                            <label htmlFor="name" className={styles.col_25} style={{color: '#ffffff'}}>Topic Name</label>
                            <input type="text" autoComplete="name" id="name" placeholder="Default Name to come here" className={styles.col_75} required />
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="name1" className={styles.col_25} style={{color: '#ffffff'}}>Description</label>
                            <textarea className={styles.col_75} rows="4" placeholder="Provide and outline of the course in less than 1000 characters..." />
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="name1" className={styles.col_25} style={{color: '#ffffff'}}>Topic Type</label>
                            <select className={styles.col_75}>
                                <option>Select Topic Type</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.chapter_foot}>
                        <AddModuleFoot  set={set} show={show}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddTopic