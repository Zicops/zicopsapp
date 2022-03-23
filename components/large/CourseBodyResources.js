import Dropdown from '../small/Dropdown'
import HeadingSubheading from '../small/HeadingSubheading'

import AddNotes from '../slComponents/AddNotes';
import Bookmark from '../slComponents/Bookmark';
import BookmarkOpen from '../slComponents/BookmarkOpen';
import ContentAdded from '../slComponents/ContentAdded';
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
            {options.map((v,i)=>{
                <TopicFiles />
            })}
            <TopicFiles />
            <TopicOpen/>
        </>
     );
}
 
export default CourseBodyResources;