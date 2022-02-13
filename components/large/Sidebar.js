import Link from "next/link";
import styles from '../../styles/Sidebar.module.css'

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>

            <div className={styles.course_management}>
                <img src="/images/sidebar_img.png" className={styles.sidebar_img} alt="" />
                <h3>Course Management</h3>
            </div>

            <div className={styles.sidebar_menu}>
                <ul>
                    <Link href="#">
                        <a>Zicops Courses</a>
                    </Link>
                    <Link href="#">
                        <a className={styles.active}>My Courses</a>
                    </Link>
                    <Link href="#">
                        <a>Categories</a>
                    </Link>
                    <Link href="#">
                        <a>Sub-categories</a>
                    </Link>
                    <Link href="#">
                        <a>Dashboard</a>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar