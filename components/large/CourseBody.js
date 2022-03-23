import CoursePageTabs from '../small/CoursePageTabs'
import { useEffect, useState } from 'react';
import CourseBodyTopics from './CourseBodyTopics';
import CourseBodyResources from './CourseBodyResources';
import CourseBodyNotes from './CourseBodyNotes';

import AboutTabBigSection from '../slComponents/AboutTabBigSection';

import Dropdown from '../small/Dropdown'
import BottomTabsMenu from '../small/BottomTabsMenu'


const CourseBody = () => {

    const [activeTab, setActiveTab] = useState(0)
    const options = [
        { value: 'module1', label: 'Module 1' },
        { value: 'module2', label: 'Module 2' },
        { value: 'module3', label: 'Module 3' },
        { value: 'module4', label: 'Module 4' }
      ]

    const showActiveTab = (activeTab) => {
        switch (activeTab) {
            case 0:
            return <CourseBodyTopics/>
            case 1:
            return <CourseBodyResources/>
            case 2:
            return <CourseBodyNotes/>
            case 3:
            return " ABCD "
            case 4:
            return " XYZ "
            case 5:
            return <AboutTabBigSection/>
            default:
            return <CourseBodyTopics/>
        }
    }

    return (
        <>
        <div className='coursebody'>
        <CoursePageTabs props={{activeTab:activeTab, setActiveTab:setActiveTab}}/>
        {showActiveTab(activeTab)}
        {(activeTab<5)?
        <>
        <Dropdown options={options} />
        <BottomTabsMenu props={{activeTab:activeTab, setActiveTab:setActiveTab}}/>
        </> : ''
        }
        </div>
        <style jsx>
        {`.coursebody{
            background-color: #1a1d21;
        }`}
        </style>
        </>
    )
}

export default CourseBody