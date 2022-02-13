import Link from "next/link";
import { useRouter } from "next/router";

import CourseMaster from "../medium/CourseMaster";
import CourseDetails from "../medium/CourseDetails";
import CourseAbout from "../medium/CourseAbout";
import CourseTopics from "../medium/CourseTopics";
import CourseConfiguration from "../medium/CourseConfiguration";


const Tab = ({ href, isSelected, title }) => (
    <Link href={href}>
      <a
        style={{
          padding: '7px 35px 8px 35px',
          marginTop: '5px',
          backgroundColor: isSelected ? "#202222" : "transparent",
          color: isSelected ? 'var(--white)' : 'var(--dark_three)',
          borderRadius: '5px 5px 0 0',
          fontSize: '16px',
          lineHeight: '36px',
          outline: 0,
          border: 0,
        }}
      >
        {title}
      </a>
    </Link>
)

export default function Tabs(){
    const { query } = useRouter();

    let isTabOneSelected = !!query.tabOne;
    const isTabTwoSelected = !!query.tabTwo;
    const isTabThreeSelected = !!query.tabThree;
    const isTabFourSelected = !!query.tabFour;
    const isTabFiveSelected = !!query.tabFive;

    if(typeof query.tabOne == 'undefined'){
      query.tabOne = true;
      isTabOneSelected = true;
    }
    if(query.tabTwo || query.tabThree || query.tabFour || query.tabFive){
      query.tabOne = false;
    }

    return(
        <div>
            <nav>
                <Tab href="/admin/?tabOne=true" title="Course Master" isSelected={isTabOneSelected} /> 
                <Tab href="/admin/?tabTwo=true" title="Details" isSelected={isTabTwoSelected} /> 
                <Tab href="/admin/?tabThree=true" title="About" isSelected={isTabThreeSelected} />
                <Tab href="/admin/?tabFour=true" title="Topics" isSelected={isTabFourSelected} /> 
                <Tab href="/admin/?tabFive=true" title="Configuration" isSelected={isTabFiveSelected} /> 
            </nav>
            <section className="tabSection">
                {/* <p>{JSON.stringify(query)}</p> */}
                {query.tabOne ? <CourseMaster /> : ''}
                {query.tabTwo && <CourseDetails />}
                {query.tabThree && <CourseAbout />}
                {query.tabFour && <CourseTopics />}
                {query.tabFive && <CourseConfiguration />}
            </section>
            <style jsx>{`
            .tabSection {
              background-color: #202222; 
              height: 60vh; 
              overflow: auto;
            }

            .tabSection::-webkit-scrollbar {
                width: 15px;
                border-radius: 7px;
                cursor: pointer;
            }
            .tabSection::-webkit-scrollbar-track {
                background: #2a2e31; 
                border-radius: 7px;
            }

            .tabSection::-webkit-scrollbar-thumb {
                background: #969a9d; 
                border-radius: 7px;
            }

            .tabSection::-webkit-scrollbar-thumb::hover {
                background: #555;   
            }
            `}</style>
        </div>
    )
}