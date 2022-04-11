import Dropdown from '../small/Dropdown';
import HeadingSubheading from '../small/HeadingSubheading';
import ItemSlider from '../ItemSlider';
import { useContext } from 'react';
import { userContext } from '../../state/contexts/UserContext';
import Bookmark from '../slComponents/Bookmark';
import Notes from '../Notes';
const CourseBodyNotes = () => {
  const options = [
    { value: 'module1', label: 'Module 1' },
    { value: 'module2', label: 'Module 2' },
    { value: 'module3', label: 'Module 3' },
    { value: 'module4', label: 'Module 4' }
  ];
  const { bookmarkData, notes } = useContext(userContext);
  console.log(bookmarkData, notes);
  return (
    <>
      <Dropdown options={options} />
      <HeadingSubheading />
      <ItemSlider items={options} />
      <div className="doubleContainer" style={{padding:'0 calc(7% + 25px)'}}>
      {bookmarkData.map((b, i) => {
          return <Bookmark key={i} img={b.captureImg} timestamp={b.timestamp.toFixed(2)} title={b.title} />;
      })}
      </div>
      {notes.map((n, i) => {
        return <Notes key={i} timestamp={n.timestamp} title={n.title} notes={n.notes} />;
      })}

      <style jsx>{`
      .doubleContainer {
        display: grid;
        grid-template-columns: auto auto;
        column-gap: 20px;
      }
      `}</style>
    </>
  );
};

export default CourseBodyNotes;
