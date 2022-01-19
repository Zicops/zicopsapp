import Link from "next/link";
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.row}>
                <div className={styles.footer_left}>
                    <div className={styles.col_50}>
                    <div className={styles.h_footer}>
                        <Link href="#about_piLearning">
                            <a>About Zicops</a>
                        </Link>
                        <Link href="#about_piLearning">
                            <a>Terms Of Uses</a>
                        </Link>
                        <Link href="#about_piLearning">
                            <a>Privacy Policy</a>
                        </Link>
                        <Link href="#about_piLearning">
                            <a>FAQ</a>
                        </Link>
                        <Link href="#about_piLearning">
                            <a>Feedback</a>
                        </Link>
                        <Link href="#about_piLearning">
                            <a>Careers</a>
                        </Link>
                        {/* <a href="#about_piLearning">About Zicops</a>
                        <a href="#terms_of_uses">Terms Of Uses</a>
                        <a href="#privacy_policy">Privacy Policy</a>
                        <a href="#faq">FAQ</a>
                        <a href="#feedback">Feedback</a>
                        <a href="#careers">Careers</a> */}
                    </div>

                    <p className={styles.p_footer}>
                        © 2021 PiLearning. All Rights Reserved. PiLearning and all related
                        channel and programming logos are service marks of, and all related
                        programming visuals and elemnts are the property of Pilearning,Inc.
                        All rights reserved.
                    </p>
                    </div>
                </div>
                <div className={styles.footer_right}>
                    {/* <div className={styles.col_50}> */}
                        <div className={styles.connect_us}>
                            <p className={styles.h_footer}>Connect with us</p>
                            <img src="/images/Twitter.png" alt=""/>
                            <img src="/images/FB.png" alt=""/>
                            <img src="/images/Insta.png" alt=""/>
                            <img src="/images/LinkedIn.png" alt=""/>
                        </div>
                        <div className={styles.store}>
                            <p className={styles.h_footer}>PiLearning App</p>
                            <img src="/images/play_store.png" alt="" />
                            <img src="/images/app_store.png" alt="" />
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Footer