import Link from "next/link";
import {useRouter} from 'next/router'
import styles from '../../styles/Sidebar.module.css'

const SidebarData = [
    {

        title: "Zicops Courses" ,
        link: "/admin/zicops-courses"

    },
    {

        title: "My Courses" ,
        link: "/admin/add-new-course"

    },
    {

        title: "Categories" ,
        link: "/admin/categories"

    },
    {

        title: "Sub-categories" ,
        link: "/admin/subcategories"

    },
    {

        title: "Dashboard" ,
        link: "/admin"

    },
]
const Sidebar = () => {
    const router = useRouter()
    return (
        <div className={styles.sidebar}>

            <div className={styles.course_management}>
                <img src="/images/sidebar_img.png" className={styles.sidebar_img} alt="" />
                <h3>Course Management</h3>
            </div>

            <div className={styles.sidebar_menu}>
                <ul>
                {SidebarData.map((val, key) => {
                    return ( 
                        <Link href={val.link}
                            key={key} 
                            className="row"
                            id={router.pathname == val.link ? "active" : ""}
                            onClick={()=> {
                                router.pathname = val.link
                            }}
                        >                   
                            <a>{val.title}</a>
                        </Link>
                        
                    )   
                })}
                    {/* <Link href="#">
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
                    </Link> */}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar