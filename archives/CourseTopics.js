import { useState, useEffect, useContext } from 'react';
import IconButton from '../components/small/IconButton';
import Popup from 'reactjs-popup';
import AddModulePopup from '../components/adminComps/Topics/AddModulePopup';
import AddChapterPopup from '../components/adminComps/Topics/AddChapterPopup';
import AddTopicPopup from '../components/adminComps/Topics/AddTopicPopup';
import { courseContext } from '../state/contexts/CourseContext';
import { moduleContext } from '../state/contexts/ModuleContext';
import ModuleRow from '../components/adminComps/Topics/ModuleRow';
import ModuleBox from '../components/adminComps/Topics/ModuleBox';
import ModuleAdded from '../components/small/ModuleAdded';
import { GET_COURSE_MODULES } from '../API/Queries'
import { useQuery } from '@apollo/client';


function GetCourseModules(course_id) {
    const { data } = useQuery(GET_COURSE_MODULES, {
                      variables: {
                        course_id: course_id
                      }
                    });
    return data;
  }

const CourseTopics2 = () => {
    const { fullCourse, setTab } = useContext(courseContext);
    const { module, addAndUpdateModule, chapter, topic } = useContext(moduleContext);

    const [openModal, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const [showModule, setModule] = useState(false);

    const all_modules = GetCourseModules(fullCourse.id);

    useEffect(() => {
        if (typeof all_modules != 'undefined') {
            let zCount = all_modules.getCourseModules.length;
            alert(zCount)
            for(let z = 0 ; z<zCount; z++){
                // addAndUpdateModule( all_modules.getCourseModules[z] );
                console.log(all_modules.getCourseModules[z]);
            }
        }
    }, [all_modules])

    const openModalIfCourseAdded = () => {
        if( !fullCourse.id ) {
            setTab('tab1');
            setTimeout( () => alert('Add course first!') , 10);
        };
        setModal(o => !o)
    }

    
    return ( 
        <>
        <div>

            { module.map( (value, index) => {
                return <ModuleRow key={index} mod={value} />
            }) }

            { (all_modules) && all_modules.getCourseModules.map( (value, index) => {
                return <ModuleRow key={index} mod={value} />
            }) }    
            
            <div className="row modbtn">         
                <span onClick={openModalIfCourseAdded}>
                    <IconButton text="Add Module" styleClass="black"/>
                </span>
                <Popup open={openModal} closeOnDocumentClick={false} onClose={closeModal}>
                    <AddModulePopup set={setModal} show={setModule}/>
                </Popup>
            </div>

        </div>
        <style jsx>
            {`
            .modbtn{
                padding: 30px;
            }
            .buttongap{
                margin: 10px 0;
            }
            `}
        </style>
        </>
     );
}
 
export default CourseTopics2;