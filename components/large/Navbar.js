import Link from 'next/link';
import styles from '../../styles/Nav.module.css'
import LeftDropdown from '../menuComps/LeftDropdown';
import { useContext } from 'react';
import { userContext } from '../../state/contexts/UserContext'

const Nav = () => {

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
                <div className={styles.special_menu}>
                    <ul>
                        {/* <li><img src="images/chat.png" /></li> */}
                        {/* <li><img src="images/cart.png" /></li>
                        <li><img src="images/heart.png" /></li> */}
                        <li><img src="/images/chat.png" /></li>
                        <li><img src="/images/bell.png" /></li>
                        {!isAdmin && 
                        <li><img src="/images/search.png" /></li>}
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