import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterModule } from '../../../helper/data.helper';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import ItemSlider from '../../ItemSlider';
import Notes from '../../Notes';
import Bookmark from '../../slComponents/Bookmark';
import { userContext } from '../../../state/contexts/UserContext';
import Header from '../Header';
import useShowData from '../Logic/useShowData';

export default function CourseBodyNotes() {
  const { bookmarkData, notes } = useContext(userContext);

  const courseContextData = useContext(courseContext);
  const { getModuleOptions, handleModuleChange, selectedModule } = useShowData(courseContextData);
  const moduleData = useRecoilValue(ModuleAtom);

  const options = getModuleOptions();
  const currentModule = filterModule(moduleData, selectedModule?.value);

  return (
    <>
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />
      <Header
        title={currentModule?.name}
        description={currentModule?.description || 'this is a description.'}
        expertise={currentModule?.level?.split(',').join(' | ')}
      />

      <ItemSlider items={options} />
      <div className="doubleContainer" style={{ padding: '0 calc(7% + 25px)' }}>
        {bookmarkData.map((b, i) => {
          return (
            <Bookmark
              key={i}
              img={b.captureImg}
              timestamp={b.timestamp.toFixed(2)}
              title={b.title}
            />
          );
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
}
