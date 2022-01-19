// import { useEffect } from "react";
// import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import CourseMaster from "./CourseMaster";
import CourseDetails from "./CourseDetails";
import CourseTopics from "./CourseTopics";
import CourseConfiguration from "./CourseConfiguration";

const Tab = ({ href, isSelected, title }) => (
    <Link href={href}>
      <a
        style={{
          padding: '2px 35px',
          marginTop: 5,
          backgroundColor: isSelected ? "#202222" : "transparent",
          borderRadius: '5px 5px 0 0',
          fontSize: '13px'
        }}
      >
        {title}
      </a>
    </Link>
)

export default function Tabs(){
    const { query } = useRouter();

    const isTabOneSelected = !!query.tabOne;
    const isTabTwoSelected = !!query.tabTwo;
    const isTabThreeSelected = !!query.tabThree;
    const isTabFourSelected = !!query.tabFour;

    return(
        <div>
            <nav>
                <Tab href="/admin/?tabOne=true" title="Course Master" isSelected={isTabOneSelected} /> 
                <Tab href="/admin/?tabTwo=true" title="Details" isSelected={isTabTwoSelected} /> 
                <Tab href="/admin/?tabThree=true" title="Topics" isSelected={isTabThreeSelected} />
                <Tab href="/admin/?tabFour=true" title="Configuration" isSelected={isTabFourSelected} /> 
            </nav>
            <section className="tabSection">
                {/* <p>{JSON.stringify(query)}</p> */}
                {query.tabOne ? <CourseMaster /> : ''}
                {query.tabTwo && <CourseDetails />}
                {query.tabThree && <CourseTopics />}
                {query.tabFour && <CourseConfiguration />}
            </section>
            <style jsx>{`
            .tabSection {
              background-color: #202222; 
              height: 420px; 
              overflow: auto;
            }
            /* Scrollbar */
            /* width */
            .tabSection::-webkit-scrollbar {
                width: 15px;
                border-radius: 7px;
                cursor: pointer;
            }
            /* Track */
            .tabSection::-webkit-scrollbar-track {
                background: #2a2e31; 
                border-radius: 7px;
            }
            /* Handle */
            .tabSection::-webkit-scrollbar-thumb {
                background: #969a9d; 
                border-radius: 7px;
            }
            /* Handle on hover */
            .tabSection::-webkit-scrollbar-thumb:hover {
                background: #555;   
            }
            `}</style>
        </div>
    )
}