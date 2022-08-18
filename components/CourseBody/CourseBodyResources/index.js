import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterAndSortTopicsBasedOnModuleId, filterModule } from '../../../helper/data.helper';
import { ModuleAtom, TopicAtom } from '../../../state/atoms/module.atoms';
import { courseContext } from '../../../state/contexts/CourseContext';
import Dropdown from '../../common/Dropdown';
import CourseResourcesOpen from '../../CourseResourcesOpen';
import Header from '../Header';
import useShowData from '../Logic/useShowData';
import TopicFileSlider from '../TopicFileSlider';

export default function CourseBodyResources() {
  const courseContextData = useContext(courseContext);
  const {
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

  const topicData = useRecoilValue(TopicAtom);

  const filteredAndSortedData = filterAndSortTopicsBasedOnModuleId(
    topicData,
    selectedModule?.value
  );

  return (
    <>
      <Dropdown
        options={options}
        handleChange={handleModuleChange}
        value={selectedModule}
        customStyles={{ margin: '20px auto 0px' }}
      />
      <Header
        title={currentModule?.name}
        description={currentModule?.description || ''}
        expertise={currentModule?.level?.split(',').join(' | ')}
      />

      <TopicFileSlider
        key={selectedModule?.value}
        itemsArr={filteredAndSortedData}
        showResources={showResources}
        isResourceShown={isResourceShown}
      />

      <CourseResourcesOpen resources={filteredResources} isResourceShown={isResourceShown} />
    </>
  );
}
