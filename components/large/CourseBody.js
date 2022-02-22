import CoursePageTabs from '../small/CoursePageTabs'
import Select from 'react-select'
import HeadingSubheading from '../small/HeadingSubheading'
import ChapterLoop from '../medium/ChapterLoop'


const CourseBody = () => {
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
        <div className='coursebody'>
        <CoursePageTabs />
        <div className='row' style={{margin:'40px 0 0'}}>
            <Select 
              options={options} 
              defaultValue={{ value: 'module1', label: 'Module 1' }}
              className='zicops_select_container'
              classNamePrefix="zicops_select"
              />
        </div>
        
        <HeadingSubheading />
        <ChapterLoop data={data} topic={three} />
        <ChapterLoop data={data} topic={three} />
        <ChapterLoop data={data} topic={three} />
        <ChapterLoop data={data} topic={three} />
        </div>
        <style jsx>
        {`.coursebody{
            background-color: #1a1a1a;
        }`}
        </style>
        </>
    )
}

export default CourseBody