import Link from "next/link";
import CourseHead from "./CourseHead";
import Main_content_panel from "./Main_content_panel";
import Admin_content_foot from "./AdminContentFoot";
import styles from '../styles/AdminContent.module.css';

const AdminContent = () => {
    return (
        <div className={styles.content}>
            <CourseHead />
            <Main_content_panel>
  
            </Main_content_panel>
            <Admin_content_foot />
        </div>
    )
}

export default AdminContent