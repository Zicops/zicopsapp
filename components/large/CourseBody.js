import CoursePageTabs from '../small/CoursePageTabs'
import { useEffect, useState } from 'react';
import CourseBodyTopics from './CourseBodyTopics';
import CourseBodyResources from './CourseBodyResources';
import CourseBodyNotes from './CourseBodyNotes';
import CourseBodyAbout from './CourseBodyAbout';

import AboutTabBigSection from '../slComponents/AboutTabBigSection';

import Dropdown from '../small/Dropdown'
import BottomTabsMenu from '../small/BottomTabsMenu'


const CourseBody = () => {

    const [activeCourseTab, setActiveCourseTab] = useState('Topics')
    const options = [
        { value: 'module1', label: 'Module 1' },
        { value: 'module2', label: 'Module 2' },
        { value: 'module3', label: 'Module 3' },
        { value: 'module4', label: 'Module 4' }
      ]
    const props = {activeCourseTab:activeCourseTab, setActiveCourseTab:setActiveCourseTab};
    const showActiveTab = (activeTab) => {
        switch (activeTab) {
            case 'Topics':
            return <CourseBodyTopics/>
            case 'Resources':
            return <CourseBodyResources/>
            case 'Notes':
            return <CourseBodyNotes/>
            case 'Discussion':
            return " ABCD "
            case 'Mentor':
            return " XYZ "
            case 'About':
            return <CourseBodyAbout/>
            default:
            return <CourseBodyTopics/>
        }
    }

    return (
        <>
        <div className='coursebody'>
            <CoursePageTabs props={props}/>
  
                {showActiveTab(activeCourseTab)}
                {(activeCourseTab !== 'About')?
                <>
                <Dropdown options={options} />
                <BottomTabsMenu props={props}/>
                </> : ''
                }
  
        </div>
        <style jsx>
        {`

            .coursebody{
                background-color: #1a1d21;
            }
        `}
        </style>
        </>
    )
}

export default CourseBody