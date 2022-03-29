import Link from 'next/link';
import styles from '../../styles/Nav.module.css'
import LeftDropdown from '../menuComps/LeftDropdown';
import { useState, useContext } from 'react';
import { userContext } from '../../state/contexts/UserContext'

const Nav = () => {

    const [ isSearch, setSearch ] = useState(0);
    const { isAdmin } = useContext(userContext);
    const AdminMenu = [
        {
            title: "Users",
            link: "/"
        },
        {
            title: "Course",
            link: "/"
        },
        {
            title: "Training",
            link: "/"
        },
        {
            title: "Exams",
            link: "/"
        },
        {
            title: "Vendor",
            link: "/"
        },
        {
            title: "Lab",
            link: "/"
        },
        {
            title: "Analytics",
            link: "/"
        },
        {
            title: "Administration",
            link: "/"
        },
    ]
    const UserMenu = [
        {
            title: "Self",
            link: "/self-landing"
        },
        {
            title: "Classroom",
            link: "/"
        },
        {
            title: "Events",
            link: "/"
        },
        {
            title: "Labs",
            link: "/"
        },
        {
            title: "Exams",
            link: "/"
        },
        {
            title: "Community",
            link: "/courses"
        },
    ]

    function truncate(str) {
        return str.length > 16 ? str.substring(0, 13) + "..." : str;
    }
    function searchShow() {
        setSearch(1);
        return;
    }
    function searchHide() {
        let search_text = document.getElementById('nav_search_bar').value;
        if(search_text){
            return;
        }
        setSearch(0);
        return;
    }
    return (
        <div className={styles.navbar} id="navbar">
            <div className={styles.left}>
                <LeftDropdown />
                <Link href={isAdmin?"/admin":"/"}>
                <a>
                <div className={styles.logo}>
                    <img src="/images/zicops-header-logo.png" />
                </div>
                </a>
                </Link>
                <div className={styles.menu}>
                    <ul>
                        {((isAdmin)?AdminMenu:UserMenu).map((val, key) => {
                            return ( 
                                <Link href={val.link} key={key}>                   
                                    <li>{val.title}</li>
                                </Link>  
                            )   
                        })}
                    </ul>
                </div>
            </div>
            <div className={styles.right}>
                {!isSearch ? '' :
                <div className={styles.search_menu} onMouseLeave={searchHide} >
                    <select className={styles.nav_search_dropdown} placeholder="Search..." >
                        <option>All</option>
                        <option>Self Paced</option>
                        <option>Classroom</option>
                        <option>Labs</option>
                        <option>Exam</option>
                        <option>Blogs</option>
                    </select>
                    <input type="text" className={styles.nav_search} id="nav_search_bar" placeholder="Search..."/>
                    <button className={styles.nav_search_btn}></button>
                </div>
                }
                <div className={styles.special_menu}>
                    <ul>
                        {/* <li><img src="images/chat.png" /></li> */}
                        {/* <li><img src="images/cart.png" /></li>
                        <li><img src="images/heart.png" /></li> */}
                        {!isAdmin && !isSearch &&
                        <li onMouseEnter={searchShow} ><img src="/images/search.png" /></li>
                        }
                        <li><img src="/images/bell.png" /></li>
                        <li><img src="/images/chat.png" /></li>
                    </ul>
                </div>
                <div className={styles.profile}>
                    <img className={styles.profilepic} src="/images/dp.png" />
                    <div className={styles.profilename}>
                        <div className={styles.name}>
                        {truncate('Abhishek Ghosh')}
                        </div>
                        <div className={styles.desg}>
                            Zicops
                        </div>
                    </div>
                    <img className={styles.dropdownicon} src="/images/arrow2.png" /> 
                    {/* //onMouseEnter={profilehover}  */}
                </div>
            </div>
        </div>  
    )
}

export default Nav