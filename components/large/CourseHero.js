import { useRouter } from 'next/router'

const CourseHero = ({set}) => {
    const ShowPlayer = () => set(true);
    const router = useRouter()
    return (
        <>
        <div className="course-header">
            <div className="back_btn" onClick={() => router.back()}>
                <img src="/images/bigarrowleft.png" alt="" />
            </div>
            <div className="course-header-text">
                <div className="heading row">
                    <div className="col_75">
                        <h1>Fundamentals of Design Thinking</h1>
                        <p>This course is provisioned by <span>Zicops</span></p>

                        <ul>
                            <li>eContent</li>
                            <li>Self learning</li>
                            <li>Duration: 120 mins</li>
                        </ul>
 
                    </div>
                    <div className="icons col_25">

                    </div>
                </div>
                <div className="summary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolori...
                </div>
                <div className="more-info">
                    <div className="float row">
                        <div className="col_25">
                            <span>Key take-aways</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                        Strong foundation of design thinking UI/UX, Product Design, Part of Design Certification
                        </div> 
                    </div>
                </div>
                <div className="more-info">
                    <div className="float row">
                        <div className="col_25">
                            <span>Expertise Level</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                        Beginner
                        </div> 
                    </div>
                </div>
                <div className="course-big-button">
                    <button onClick={ShowPlayer}>Preview the course</button>
                </div>
                <div className="suggested-completion">
                    <p>** Suggested duration for completion of this course is 4 Weeks</p>
                </div>
                <div className="more-info">
                    <div className="float row">
                        <div className="col_25">
                            <span>Prerequisites</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                            Aptitude and Attitude towards Designing
                        </div>
                    </div>
                    <div className="float row">
                        <div className="col_25">
                            <span>Good for</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                            Anyone who is interested in learning the basic concepts of Designing
                        </div>
                    </div>
                    <div className="float row">
                        <div className="col_25">
                            <span>Must for</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                            Product Designers, Product Managers, Business Analyst, UI/UX Designers
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <style jsx>
            {`
            .course-header{
                padding-top: 5vh;
                // margin-top: -5vh;
                // padding-bottom: 10vh;
                margin-top:70px;
                height: 38.8889vw;
                background-color: #000909;
                background-image: url('../images/bg-new.png');
                background-position: bottom left;
                background-repeat: no-repeat;
                // background-size: 100%; 
                background-size: cover;
            }
            .back_btn{
                position: absolute;
                left: 50px;
                top: calc(6vh + 70px);
                cursor: pointer;
            }
            .course-header-text{
                color: #ffffff;
                font-size: 1vw;
                width: 50%;
                padding-left: calc(2% + 80px);
            }
            .course-header-text .heading{
            
            }
            .course-header-text .heading h1{
                font-size: 2vw;
                line-height: 2.3vw;
            }
            .course-header-text .heading p{
                color: #858f8f;
                font-size: 1vw;
                line-height: 2vw;
                padding-bottom: 1vh;
            }
            .course-header-text .heading p span{
                color: #e2e2e2;
                font-size: 1vw;
                font-weight: 600;
            }
            .course-header-text .heading ul{
                color: #e2e2e2;
                font-size: 1vw;
                display: flex;
            }
            .course-header-text .heading ul li{
                color: #adadad;
                font-size: 1vw;
                font-weight: 600;
                margin: 0 1.2vw;
            }
            .course-header-text .summary{
                color: #858f8f;
                font-size: 0.9vw;
                margin: 2vh 0px;
                padding-bottom: 1vh;
            }
            .course-header-text .more-info{
                color: #858f8f;
                font-size: 0.9vw;
            }
            .course-header-text .more-info span{
                color: var(--primary);
                font-size: 0.9vw;
                font-weight: 600;
            }
            .course-header-text .float{
                padding-bottom: 1vh;
            }
            
            .course-header-text .float p{
                float:right;
                padding-right: 1vw;
            }
            
            .course-big-button button{
                margin-top: 2vh;
                margin-bottom: 1vh;
                padding: 2vh 6vw;
            
                background-color: transparent;
                background-image: url(/images/preview-btn.png);
                background-repeat: no-repeat;
                background-size: 2vw;
                background-position: top 50% left 20%;
            
                font-size: 0.9vw;
                font-weight: bold;
                color: #6bcfcf;
                border: 2px solid #6bcfcf;
                cursor: pointer;
                transition: 0.5s;
            }
            
            .course-big-button button:hover{
                color: #000000;
                border: 2px solid #000000;       
                background-color: #6bcfcf;
                background-image: url(/images/preview-button.png);
            }
            .suggested-completion p{
                font-size: 0.7vw;
                color: #858f8f;
                margin-bottom: 20px;
            }
            `}
        </style>
        </>
    )
}

export default CourseHero