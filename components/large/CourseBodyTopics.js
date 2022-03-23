import Dropdown from '../small/Dropdown'
import HeadingSubheading from '../small/HeadingSubheading'
import ChapterLoop from '../medium/ChapterLoop'

const CourseBodyTopics = () => {
    const data = {
        seq: 1,
        title: 'Introduction',
        number_of_topics: 3
    }
    const three = ['1','2','3'];
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
        <ChapterLoop data={data} topic={three} />
        <ChapterLoop data={data} topic={three} />
        <ChapterLoop data={data} topic={three} />
        <ChapterLoop data={data} topic={three} />
        </>
     );
}
 
export default CourseBodyTopics;