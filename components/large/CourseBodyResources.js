import Dropdown from '../small/Dropdown'
import HeadingSubheading from '../small/HeadingSubheading'

import AddNotes from '../slComponents/AddNotes';
import Bookmark from '../slComponents/Bookmark';
import BookmarkOpen from '../slComponents/BookmarkOpen';
import Notes from '../slComponents/Notes';
import NotesAdded from '../slComponents/NotesAdded';
import TopicFiles from '../slComponents/TopicFiles';
import TopicOpen from '../slComponents/TopicOpen';

const CourseBodyResources = () => {
    const options = [
        { value: 'module1', label: 'Module 1' },
        { value: 'module2', label: 'Module 2' },
        { value: 'module3', label: 'Module 3' },
        { value: 'module4', label: 'Module 4' }
      ]
    return ( 
        <>
            <Dropdown options={options} />
            <HeadingSubheading />
            {/* {options.map((v,i)=>{
                v&&<TopicFiles />
            })} */}
            <div className="row" style={{padding:'0 calc(6% + 25px)'}}>
            <TopicFiles /><TopicFiles /><TopicFiles /><TopicFiles />
            </div>
            <div style={{display: 'flex', width: '100%', padding:'0 calc(6% + 25px)', alignItems: 'center'}}>
            <TopicFiles /><TopicFiles /><AddNotes text="Add Notes" /><div className="col_25"></div>
            </div>
            <div className="row" style={{padding:'0 calc(6% + 25px)'}}>
            <Notes /><Notes /><Notes /><Notes />
            </div>
            <div style={{display: 'flex', width: '100%', padding:'0 calc(6% + 25px)', alignItems: 'center'}}>
            <Notes /><Notes /><AddNotes text="Add Resource" /><div className="col_25"></div>
            </div>
        </>
     );
}
 
export default CourseBodyResources;