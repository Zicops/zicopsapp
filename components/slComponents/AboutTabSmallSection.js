import CardCourseRow from "../small/CardCourseRow";
import CardHeadingWithList from "../small/CardHeadingWithList";
import CardHeadingWith2List from "../small/CardHeadingWith2List";
import CardHeadingWithPills from "../small/CardHeadingWithPills";
import CardHeadingWithData from "../small/CardHeadingWithData";
import { benefits, learning_objective, prerequisites, target_audience, course_incl, related_skills } from "../../API/DemoCourseData";

const AboutTabSmallSection = () => {
    
    return ( 
        <>
            <CardCourseRow>
                <div className="col_50 small_compo">
                    <CardHeadingWithList props={benefits}/>
                </div>
                <div className="col_50 small_compo">
                    <CardHeadingWithList props={learning_objective}/>
                </div>
            </CardCourseRow>
            <CardCourseRow>
                <div className="col_50 small_compo">
                    <CardHeadingWithList props={prerequisites}/>
                </div>
                <div className="col_50 small_compo">
                    <CardHeadingWith2List props={target_audience}/>
                </div>
            </CardCourseRow>
            <CardCourseRow>
                <div className="col_50 small_compo">
                    <CardHeadingWithData props={course_incl}/>
                </div>
                <div className="col_50 small_compo">
                    <CardHeadingWithPills props={related_skills}/>
                </div>
            </CardCourseRow>
        <style jsx>{`
            .small_compo{
                flex: 1;
                background-color:#323232;
                margin:25px;
                padding:50px;
                border-radius:5px;
            }
        `}
        </style>
        </>
     );
}
 
export default AboutTabSmallSection;