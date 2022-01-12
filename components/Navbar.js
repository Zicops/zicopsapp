import styles from '../styles/Nav.module.css'

const Nav = () => {
    return (
        <div className={styles.navbar} id="navbar">
            <div className={styles.left}>
                <div className={styles.menuicon}>
                    <img src="images/menu.png" />
                </div>
                <div className={styles.logo}>
                    <img src="images/logo.png" />
                </div>
                <div className={styles.menu}>
                    <ul>
                        <li>Self</li>
                        <li>Classroom</li>
                        <li>Events</li>
                        <li>Labs</li>
                        <li>Exams</li>
                        <li>Community</li>
                    </ul>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.special_menu}>
                    <ul>
                        <li><img src="images/chat.png" /></li>
                        <li><img src="images/cart.png" /></li>
                        <li><img src="images/heart.png" /></li>
                        <li><img src="images/bell.png" /></li>
                        <li><img src="images/search.png" /></li>
                    </ul>
                </div>
                <div className={styles.profile}>
                    <img className={styles.profilepic} src="images/dp.png" />
                    <div className={styles.profilename}>
                        <div className={styles.name}>
                            Abhishek Ghosh
                        </div>
                        <div className={styles.desg}>
                            NexxtEduTech
                        </div>
                    </div>
                    <img className={styles.dropdownicon} src="images/arrow2.png" />
                </div>
            </div>
        </div>
    )
}

export default Nav