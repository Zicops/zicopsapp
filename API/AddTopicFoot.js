import styles from '../styles/CourseMaster.module.css';

const AddTopicFoot = () => {
    return (
        <div className={styles.two_buttons}>
            <button type="button" value="cancel" className={styles.button_one} >Design Later</button>
            <button type="button" value="add" className={styles.button_two}>Save</button>
        </div>
    )
}

export default AddTopicFoot