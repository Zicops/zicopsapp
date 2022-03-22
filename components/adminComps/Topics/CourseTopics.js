import { useState, useContext } from 'react';
import IconButton from '../../small/IconButton';
import Popup from 'reactjs-popup';
import AddModulePopup from './AddModulePopup';
import AddChapterPopup from './AddChapterPopup';
import AddTopicPopup from './AddTopicPopup';
import { courseContext } from '../../../state/contexts/CourseContext';
import { moduleContext } from '../../../state/contexts/ModuleContext';
import ModuleRow from './ModuleRow';
import ModuleBox from './ModuleBox';
import ModuleAdded from '../../small/ModuleAdded';

const CourseTopics2 = () => {
    const { fullCourse, setTab } = useContext(courseContext);
    const { module, chapter, topic } = useContext(moduleContext);

    // console.log(module)

    const [openModal, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const [showModule, setModule] = useState(false);


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

                {module.map( (value, index) => {
                    return <ModuleRow key={index} mod={value} />
                }) }
                
            
            <div className="row">         
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
            .row{
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