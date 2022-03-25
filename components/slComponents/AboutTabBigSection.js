import CardCourseAbout from "../small/CardCourseAbout";
import {about_course} from "../../API/DemoCourseData"
const AboutTabBigSection = () => {
    return ( 
        <>
        <CardCourseAbout>
            <div className="tab_heading">
                {about_course.heading}
            </div>
            <div className="tab_section_summary">
                <p>{about_course.description}</p>
            </div>
            <div className="row my_30 abstra">
                <div className="col_33">
                    <div className="row">
                        <div className="col_50">
                            <div>Course Duration: </div>
                        </div>
                        <div className="col_50 abstract">
                            <div>{about_course.duration} Hours</div>
                        </div>
                    </div>
                </div>
                <div className="col_33">
                    <div className="row">
                        <div className="col_25">
                            <div>Owned By: </div>
                        </div>
                        <div className="col_75 abstract">
                            <div>{about_course.owner}</div>
                        </div>
                    </div>
                </div>
                <div className="col_33">

                </div>
            </div>
            <div className="row my_30 abstra">
                <div className="col_33">
                    <div className="row">
                        <div className="col_50">
                            <div>Expected Completion Time: </div>
                        </div>
                        <div className="col_50 abstract">
                            <div>{about_course.competion_time} Hours</div>
                        </div>
                    </div>
                </div>
                <div className="col_33">
                    <div className="row">
                        <div className="col_25">
                            <div>Instructor: </div>
                        </div>
                        <div className="col_75 abstract">
                            <h4>{about_course.instructor.name}</h4>
                            <p>{about_course.instructor.desg}</p>
                            <p>{about_course.instructor.dept}</p>
                            <p>{about_course.instructor.position}</p>
                        </div>
                    </div>
                </div>
                <div className="col_33">
                    
                </div>
            </div>
        </CardCourseAbout>
        <style jsx>{`
            .tab_heading{
                color: var(--primary);
                font-size:1.5vw;
                padding-bottom:15px;
                font-weight:700;
            }
            .tab_section_summary{
                color: var(--primary);
                font-size: 0.9vw;
            }
            .abstra{
                font-size: 0.9vw;
                color: var(--primary); 
            }
            .abstract{
                color: var(--white);
                font-weight: 600;
            }
            .abstract h4{
                margin-bottom: 5px;
            }
            .abstract p{
                margin-bottom: 5px;
                font-weight: 400;
            }
        `}</style>
        </>
     );
}
 
export default AboutTabBigSection;