import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterResources } from '../../../helper/data.helper';
import { ModuleAtom, ResourcesAtom } from '../../../state/atoms/module.atoms';
import { UserCourseDataAtom } from '../../../state/atoms/video.atom';
import {
  ActiveCourseTabAtom,
  ActiveResourcesAtom,
  SelectedModuleDataAtom,
  tabs
} from './courseBody.helper';

export default function useShowData(courseContextData) {
  let myRef = useRef(null);
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabAtom);
  const [isResourceShown, setIsResourceShown] = useRecoilState(ActiveResourcesAtom);
  const [selectedModule, setSelectedModule] = useRecoilState(SelectedModuleDataAtom);
  const [isNotesVisible, setIsNotesVisible] = useState(null);

  useEffect(() => {
    if (myRef?.current?.getBoundingClientRect()?.top <= 80) {
      window.scrollTo({ behavior: 'smooth', top: 600 });
      return;
    }

    if (activeCourseTab != 'Topics') {
      window.scrollTo({ behavior: 'smooth', top: myRef.current?.offsetTop - 200 });
    }
  }, [activeCourseTab]);

  // recoil states
  const userData = useRecoilValue(UserStateAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  // const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [moduleData, updateModuleData] = useRecoilState(ModuleAtom);
  // const [chapter, updateChapterData] = useRecoilState(ChapterAtom);
  // const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  // const [topicContent, updateTopicContent] = useRecoilState(TopicContentAtom);
  const [resources, updateResources] = useRecoilState(ResourcesAtom);
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    if (!userCourseData?.activeModule?.id) return;
    if (!userCourseData?.switchModule) return;

    if (userCourseData?.activeModule?.id !== selectedModule?.value) {
      setSelectedModule({
        label: `MODULE ${userCourseData?.activeModule?.index + 1}`,
        value: userCourseData?.activeModule?.id
      });
      setUserCourseData({ ...userCourseData, switchModule: false });
    }
  }, [userCourseData?.activeModule]);

  // function saveContentInState(data) {
  //   let localData = [...topicContent, ...data];
  //   console.log(localData, topicContent, data);
  //   updateTopicContent(localData);
  // }

  // useEffect(() => {
  //   let localData = [];
  //   topicData.some((t, i) => {
  //     loadTopicContentData({ variables: { topic_id: t.id } }).then(({ data }) => {
  //       localData = [...localData, ...data.getTopicContent];
  //       console.log(i, data, t.id, topicContent, localData);

  //       updateTopicContent(localData);

  //       if (errorTopicContentData) alert('Topic Content Load Error');
  //     });

  //     return false;
  //   });
  // }, [topicData]);

  // useEffect(() => {
  //   console.log('topicContenttopicContent', topicContent);
  // }, [topicContent]);

  // useEffect(() => {
  //   if (activeCourseTab === 'Resources') {
  //     topicData.every((topic) => {
  //       loadResourcesData({ variables: { topic_id: topic.id } }).then(({ data }) => {
  //         console.log(data);
  //         updateResources([...resources, ...data.getTopicResources]);

  //         if (errorResourcesData) alert('Resources Load Error');
  //       });

  //       return false;
  //     });
  //   }
  // }, [activeCourseTab]);

  // load topicContent
  // TODO: call this on activateEditTopic has been called and after currentTopic has id
  //   useLoadAndSetDataInContext(GET_COURSE_TOPICS_CONTENT, { topic_id: currentTopic.id }, (data) => {
  //     if (!data) return;
  //     if (!data.getTopicContent) return;
  //     if (!data.getTopicContent.length) return;

  //     addUpdateTopicContent(data.getTopicContent[0]);
  //     setCourseTopicVideo(data.getTopicContent[0]);
  //     setCourseTopicSubtitle(data.getTopicContent[0]);
  //   });

  function showActiveTab(activeTab) {
    const index = tabs.findIndex((tab) => tab.name === activeTab);
    if (index < 0) return tabs[0].comp;
    return tabs[index].comp;
  }

  function getModuleOptions(data) {
    const options = [];
    if (data) {
      data.forEach((mod) => {
        options.push({
          value: mod.id,
          // label: mod.name
          label: 'MODULE ' + mod.sequence
        });
      });
    } else {
      moduleData?.forEach((mod) => {
        options.push({
          value: mod.id,
          // label: mod.name
          label: 'MODULE ' + mod.sequence
        });
      });
    }

    return options;
  }

  function handleModuleChange(e) {
    setSelectedModule(e);
    setUserCourseData({
      ...userCourseData,
      activeModule: { id: e?.value, index: e?.label?.split(' ')[1] - 1 }
    });
    setIsResourceShown(null);
  }

  function showResources(topic) {
    console.log(topic);
    setActiveCourseTab(tabs[1].name);
    if (isResourceShown?.includes(topic.id)) {
      setFilteredResources([]);
      setIsResourceShown(null);
      return;
    }

    setFilteredResources(filterResources(resources, topic.id));
    setIsResourceShown(topic.id + '|:|' + topic.name);

    // loadResourcesData({ variables: { topic_id: topic.id } }).then(({ data }) => {
    //   // console.log('data.getTopicResources', data.getTopicResources);
    //   updateResources((prev) => data.getTopicResources);

    //   if (errorResourcesData) alert('Resources Load Error');
    // });
  }

  function toggleNotesVisibility(topic) {
    // update later to filter topic notes from all notes
    if (isNotesVisible?.includes(topic.id)) {
      setIsNotesVisible(null);
      return;
    }

    setIsNotesVisible(topic.id + '|:|' + topic.name);
  }

  return {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    handleModuleChange,
    selectedModule,
    setSelectedModule,
    showResources,
    filteredResources,
    isResourceShown,
    isNotesVisible,
    toggleNotesVisibility
  };
}
