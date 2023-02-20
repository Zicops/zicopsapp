import styles from "../vctoolMain.module.scss"
const About = ({ showHide }) => {
    return (
        <div className={`${styles.Aboutbar}`}>
            <div className={`${styles.About_head}`}>
                <div>About</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.about_head_screen}`}>
                <div style={{
                    marginTop: "15px",
                    paddingTop: "10px",
                    width: "276px",
                    heigth: "56px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "white"
                }}>Classroom session on the sub introduction to PM</div>
                <div style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    color: "white",
                    fontSize: "14px"
                }}>sessions :2</div>
                <div className={`${styles.aboutInstructor}`}>
                    <div className={`${styles.aboutInstructorlogo}`}></div>
                    <div className={`${styles.Intructorinfo}`}>
                        <div style={{
                            color: "#ACACAC"
                        }}>Instructor:</div>
                        <div style={{
                            color: "white"
                        }}>Fekete Csanád</div>
                    </div>
                </div>
                {/* info */}
                {/* /images/svg/vctool/insert-chart.svg */}
                <div className={`${styles.aboutscreen}`}>
                    <div className={`${styles.aboutmeetinginfo}`}>
                        <div className={`${styles.aboutmeetinglogo}`}>
                            <img src="/images/svg/vctool/translate.svg" />
                        </div>
                        <div className={`${styles.Intructorinfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Language:</div>
                            <div style={{
                                color: "white"
                            }}>English (United Kingdom)</div>
                        </div>
                    </div>

                    <div className={`${styles.aboutmeetinginfo}`}>
                        <div className={`${styles.aboutmeetinglogo}`}>
                            <img src="/images/svg/vctool/supervisor-account.svg" />
                        </div>
                        <div className={`${styles.Intructorinfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Moderator:</div>
                            <div style={{
                                color: "white"
                            }}>Kathryn Murphy</div>
                        </div>
                    </div>


                    <div className={`${styles.aboutmeetinginfo}`}>
                        <div className={`${styles.aboutmeetinglogo}`}>
                            <img src="/images/svg/vctool/calendar-month.svg" />
                        </div>
                        <div className={`${styles.Intructorinfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Date:</div>
                            <div style={{
                                color: "white"
                            }}>24th September 2023</div>
                        </div>
                    </div>

                    <div className={`${styles.aboutmeetinginfo}`}>
                        <div className={`${styles.aboutmeetinglogo}`}>
                            <img src="/images/svg/vctool/schedule.svg" />
                        </div>
                        <div className={`${styles.Intructorinfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Start time:</div>
                            <div style={{
                                color: "white"
                            }}>02:00 PM(Indian standard time)</div>
                        </div>
                    </div>
                    <div className={`${styles.aboutmeetinginfo}`}>
                        <div className={`${styles.aboutmeetinglogo}`}>
                            <img src="/images/svg/vctool/timelapse.svg" />
                        </div>
                        <div className={`${styles.Intructorinfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Duration:</div>
                            <div style={{
                                color: "white"
                            }}>3 hours & 30 minutes</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
};
export default About;