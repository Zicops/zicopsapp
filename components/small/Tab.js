import { useState, createContext, useContext } from "react";
import { courseContext } from '../../state/contexts/CourseContext'


import CourseMaster from "../medium/CourseMaster";
import CourseDetails from "../medium/CourseDetails";
import CourseAbout from "../medium/CourseAbout";
import CourseTopics from "../medium/CourseTopics";
import CourseConfiguration from "../medium/CourseConfiguration";


export default function Tabs({ props }) {

  const { tab, setTab } = useContext(courseContext);

  // console.log(course);

  function showActiveTab(tab) {
    switch (tab) {
      case "tab1":
        return <CourseMaster />
      case "tab2":
        return <CourseDetails />
      case "tab3":
        return <CourseAbout />
      case "tab4":
        return <CourseTopics />
      case "tab5":
        return <CourseConfiguration />
      default:
        return <CourseMaster />
    }
  }
  return (
    <div>

      <nav className="tabHeader">
        <ul>
          <li className={tab === "tab1" ? "tabli active" : "tabli"} onClick={() => setTab('tab1')}>Course Master</li>
          <li className={tab === "tab2" ? "tabli active" : "tabli"} onClick={() => setTab('tab2')}>Details</li>
          <li className={tab === "tab3" ? "tabli active" : "tabli"} onClick={() => setTab('tab3')}>About</li>
          <li className={tab === "tab4" ? "tabli active" : "tabli"} onClick={() => setTab('tab4')}>Topics</li>
          <li className={tab === "tab5" ? "tabli active" : "tabli"} onClick={() => setTab('tab5')}>Configuration</li>
        </ul>
      </nav>
          <section className="tabSection">
            {showActiveTab(tab)}
          </section>
      <style jsx>{`
        .tabHeader{
        }
        .tabHeader ul{
          display: flex;
          flex-wrap: wrap;
          list-style:none;
        }
        .tabli{
          padding: 7px 35px 8px 35px;
          background-color: transparent;
          color: var(--dark_three);
          border-radius: 5px 5px 0 0;
          font-size: 16px;
          line-height: 20px;
          outline: 0;
          border: 0;
          cursor: pointer;
        }

        .tabli.active{
          background-color: #202222;
          color: var(--white);
          box-shadow: 0 0px 10px 0 var(--dark_one);
          border-bottom: 1px solid var(--white);
        }
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