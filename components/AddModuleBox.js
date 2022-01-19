import styles from '../styles/CourseMaster.module.css';

const AddModuleBox = ({title, body, foot}) => {
    return (
        <div className={styles.row}>
        <div className={styles.module_add}>
        <div className={styles.module_head}>
          <div className={styles.module_title}>
            {title}
          </div>
          <div className={styles.cross_img}>
            <img src="/images/circular-cross.png" alt="" />
          </div>
        </div>
        <div className={styles.module_body}>
            {body}
        </div>
        <div className={styles.module_foot}>
            {foot}
        </div>
      </div>
      </div>
    )
}
export default AddModuleBox