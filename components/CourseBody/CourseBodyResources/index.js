import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterAndSortTopicsBasedOnModuleId, filterModule } from '../../../helper/data.helper';
import { TopicAtom, ModuleAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import CourseResourcesOpen from '../../CourseResourcesOpen';
import Header from '../Header';
import ItemSlider from '../ItemSlider';
import useShowData from '../Logic/useShowData';

export default function CourseBodyResources() {
  const courseContextData = useContext(courseContext);
  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    // moduleData,
    handleModuleChange,
    selectedModule,
    showResources,
    filteredResources,
    isResourceShown
  } = useShowData(courseContextData);
  const moduleData = useRecoilValue(ModuleAtom);

  const options = getModuleOptions();
  const currentModule = filterModule(moduleData, selectedModule?.value);

  const { fullCourse } = courseContextData;
  const topicData = useRecoilValue(TopicAtom);
  // const { chapter: chapterData, topic, topicContent } = moduleContextData;

  const filteredAndSortedData = filterAndSortTopicsBasedOnModuleId(
    topicData,
    selectedModule?.value
  );

  return (
    <>
      <Dropdown options={options} handleChange={handleModuleChange} value={selectedModule} />
      <Header
        title={currentModule?.name}
        description={currentModule?.description || 'this is a description.'}
        expertise={currentModule?.level?.split(',').join(' | ')}
      />

      <ItemSlider
        key={selectedModule?.value}
        itemsArr={filteredAndSortedData}
        showResources={showResources}
        isResourceShown={isResourceShown}
      />

      <CourseResourcesOpen resources={filteredResources} isResourceShown={isResourceShown} />
    </>
  );
}
