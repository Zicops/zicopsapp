import styles from "../vctoolMain.module.scss"
const About = ({ showHide=false}) => {
    return (
        <div className={`${styles.aboutBar}`}>
            <div className={`${styles.aboutHead}`}>
                <div>About</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.aboutHeadScreen}`}>
                <div className={`${styles.aboutScreenHeading}`}>Classroom session on the sub introduction to PM</div>
                <div className={`${styles.aboutScreenSessionHead}`} >sessions :2</div>
                <div className={`${styles.aboutInstructor}`}>
                    <div className={`${styles.aboutInstructorlogo}`}></div>
                    <div className={`${styles.intructorInfo}`}>
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
                <div className={`${styles.aboutScreen}`}>
                    <div className={`${styles.aboutMeetingInfo}`}>
                        <div className={`${styles.aboutMeetingLogo}`}>
                            <img src="/images/svg/vctool/translate.svg" />
                        </div>
                        <div className={`${styles.intructorInfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Language:</div>
                            <div style={{
                                color: "white"
                            }}>English (United Kingdom)</div>
                        </div>
                    </div>

                    <div className={`${styles.aboutMeetingInfo}`}>
                        <div className={`${styles.aboutMeetingLogo}`}>
                            <img src="/images/svg/vctool/supervisor-account.svg" />
                        </div>
                        <div className={`${styles.intructorInfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Moderator:</div>
                            <div style={{
                                color: "white"
                            }}>Kathryn Murphy</div>
                        </div>
                    </div>


                    <div className={`${styles.aboutMeetingInfo}`}>
                        <div className={`${styles.aboutMeetingLogo}`}>
                            <img src="/images/svg/vctool/calendar-month.svg" />
                        </div>
                        <div className={`${styles.intructorInfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Date:</div>
                            <div style={{
                                color: "white"
                            }}>24th September 2023</div>
                        </div>
                    </div>

                    <div className={`${styles.aboutMeetingInfo}`}>
                        <div className={`${styles.aboutMeetingLogo}`}>
                            <img src="/images/svg/vctool/schedule.svg" />
                        </div>
                        <div className={`${styles.intructorInfo}`}>
                            <div style={{
                                color: "#ACACAC"
                            }}>Start time:</div>
                            <div style={{
                                color: "white"
                            }}>02:00 PM(Indian standard time)</div>
                        </div>
                    </div>
                    <div className={`${styles.aboutMeetingInfo}`}>
                        <div className={`${styles.aboutMeetingLogo}`}>
                            <img src="/images/svg/vctool/timelapse.svg" />
                        </div>
                        <div className={`${styles.intructorInfo}`}>
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