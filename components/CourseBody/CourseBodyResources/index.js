import { filterAndSortChapter } from '../../../helper/data.helper';
import Dropdown from '../../common/Dropdown';
import Header from '../Header';
import ItemSlider from '../ItemSlider';

export default function CourseBodyResources() {
  const moduleContextData = useContext(moduleContext);
  const courseContextData = useContext(courseContext);
  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    handleModuleChange,
    selectedModule
  } = useShowData(courseContextData, moduleContextData);

  const options = getModuleOptions();

  const { fullCourse } = courseContextData;
  const { chapter: chapterData, topic, topicContent } = moduleContextData;

  const filteredAndSortedData = filterAndSortChapter(chapterData, selectedModule?.value);

  return (
    <>
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />
      <Header
        title={fullCourse.name}
        expertise={fullCourse.expertise_level?.split(',').join(' | ')}
      />

      <ItemSlider itemsArr={filteredAndSortedData} />
    </>
  );
}