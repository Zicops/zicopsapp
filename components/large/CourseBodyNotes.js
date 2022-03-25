import Dropdown from '../small/Dropdown'
import HeadingSubheading from '../small/HeadingSubheading'
import ItemSlider from '../ItemSlider'
const CourseBodyNotes = () => {
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
            <ItemSlider items={options} />
        </>
     );
}
 
export default CourseBodyNotes;