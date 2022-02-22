const CourseHero = ({set}) => {
    const ShowPlayer = () => set(true);
    return (
        <>
        <div className="course-header">
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
                            <span>Aptitude and Attitude towards Designing</span>
                        </div>
                    </div>
                    <div className="float row">
                        <div className="col_25">
                            <span>Good for</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                            <span>Anyone who is interested in learning the basic concepts of Designing</span>
                        </div>
                    </div>
                    <div className="float row">
                        <div className="col_25">
                            <span>Must for</span>
                            <p>:</p>
                        </div>
                        <div className="col_75">
                            <span>Product Designers, Product Managers, Business Analyst, UI/UX Designers</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <style jsx>
            {`
            .course-header{
                padding-top: 150px;
                margin-top: -30px;
                padding-bottom: 50px;
                height: 94vh;
                background-color: #000909;
                background-image: url('../images/bg-new.png');
                background-position: bottom left;
                background-repeat: no-repeat;
                // background-size: 100%; 
                background-size: cover;
            }
            .course-header-text{
                color: #ffffff;
                font-size: 13px;
                width: 50%;
                padding-left: 5%;
            }
            .course-header-text .heading{
            
            }
            .course-header-text .heading h1{
                font-size: 32px;
                line-height: 36px;
            }
            .course-header-text .heading p{
                color: #858f8f;
                font-size: 13px;
                line-height: 30px;
                padding-bottom: 10px;
            }
            .course-header-text .heading p span{
                color: #e2e2e2;
                font-size: 13px;
                font-weight: 600;
            }
            .course-header-text .heading ul{
                color: #e2e2e2;
                font-size: 13px;
                display: flex;
            }
            .course-header-text .heading ul li{
                color: #adadad;
                font-size: 13px;
                font-weight: 600;
                margin: 0 15px;
            }
            .course-header-text .summary{
                color: #858f8f;
                font-size: 14px;
                margin: 20px 0px;
                padding-bottom: 10px;
            }
            .course-header-text .more-info{
                color: #858f8f;
                font-size: 13px;
            }
            .course-header-text .float{
                padding-bottom: 5px;
            }
            
            .course-header-text .float p{
                float:right;
                padding-right: 10px;
            }
            
            .course-big-button button{
                margin-top: 20px;
                margin-bottom: 5px;
                padding: 10px 90px;
            
                background-color: transparent;
                background-image: url(/images/preview-btn.png);
                background-repeat: no-repeat;
                background-size: 25px;
                background-position: top 50% left 20%;
            
                font-size: 14px;
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
                background-repeat: no-repeat;
                background-size: 25px;
                background-position: top 50% left 20%;
            }
            .suggested-completion p{
                font-size: 10px;
                color: #858f8f;
                margin-bottom: 20px;
            }
            `}
        </style>
        </>
    )
}

export default CourseHero