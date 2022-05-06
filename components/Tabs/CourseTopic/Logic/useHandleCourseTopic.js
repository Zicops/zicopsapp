import { useLazyQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  queryClient
} from '../../../../API/Queries';
import { sortArrByKeyInOrder } from '../../../../helper/data.helper';
import { ChapterAtom, ModuleAtom, TopicAtom } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';

export default function useHandleCourseTopic() {
  const { fullCourse, setTab } = useContext(courseContext);

  // pop up states
  const [isAddModulePopUpOpen, setIsAddModulePopUpOpen] = useState(false);
  const [isEditModulePopUpOpen, setIsEditModulePopUpOpen] = useState(false);

  const [isAddChapterPopUpOpen, setIsAddChapterPopUpOpen] = useState(false);
  const [isEditChapterPopUpOpen, setIsEditChapterPopUpOpen] = useState(false);

  const [isAddTopicPopUpOpen, setIsAddTopicPopUpOpen] = useState(false);
  const [isEditTopicPopUpOpen, setIsEditTopicPopUpOpen] = useState(false);

  // used in toggle pop up
  const popUpStates = [
    { name: 'addModule', state: isAddModulePopUpOpen, update: setIsAddModulePopUpOpen },
    { name: 'editModule', state: isEditModulePopUpOpen, update: setIsEditModulePopUpOpen },

    { name: 'addChapter', state: isAddChapterPopUpOpen, update: setIsAddChapterPopUpOpen },
    { name: 'editChapter', state: isEditChapterPopUpOpen, update: setIsEditChapterPopUpOpen },

    { name: 'addTopic', state: isAddTopicPopUpOpen, update: setIsAddTopicPopUpOpen },
    { name: 'editTopic', state: isEditTopicPopUpOpen, update: setIsEditTopicPopUpOpen }
  ];

  // recoil states
  const [moduleData, updateModuleData] = useRecoilState(ModuleAtom);
  const [chapterData, updateChapterData] = useRecoilState(ChapterAtom);
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);

  // module, chapter, topic data query obj
  const [loadModuleData, { error: errorModuleData, refetch: refetchModule }] = useLazyQuery(
    GET_COURSE_MODULES,
    {
      client: queryClient
    }
  );
  const [loadChapterData, { error: errorChapterData, refetch: refetchChapter }] = useLazyQuery(
    GET_COURSE_CHAPTERS,
    { client: queryClient }
  );
  const [loadTopicData, { error: errorTopicData, refetch: refetchTopic }] = useLazyQuery(
    GET_COURSE_TOPICS,
    {
      client: queryClient
    }
  );

  // load module, chapter, topic data and set in recoil
  useEffect(() => {
    loadModuleData({ variables: { course_id: fullCourse.id } }).then(({ data }) => {
      const sortedData = sortArrByKeyInOrder([...data.getCourseModules], "sequence");
      updateModuleData(sortedData);

      if (errorModuleData) alert('Module Load Error');
    });

    loadChapterData({ variables: { course_id: fullCourse.id } }).then(({ data }) => {
      updateChapterData(data.getCourseChapters);

      if (errorChapterData) alert('Chapter Load Error');
    });

    loadTopicData({ variables: { course_id: fullCourse.id } }).then(({ data }) => {
      updateTopicData(data.getTopics);

      if (errorTopicData) alert('Topic Load Error');
    });
  }, []);

  function togglePopUp(popUpName, value) {
    popUpStates.some((popUp) => {
      const isPopNameMatched = popUp.name.match(new RegExp(popUpName, 'gi'));
      if (isPopNameMatched) {
        if (!fullCourse.id) {
          setTab(tabData[0].name);
          alert('Add course first');
        }

        popUp.update(typeof value === 'boolean' ? value : !popUp.state);
      }

      return isPopNameMatched;
    });
  }

  function refetchDataAndUpdateRecoil(name) {
    if (name.match(new RegExp('module', 'gi'))) {
      refetchModule().then(({ data: { getCourseModules } }) => {
        updateModuleData(getCourseModules);
      });

      if (errorModuleData) return alert('Module Refetch Error');
      return 'SUCCESS';
    }

    if (name.match(new RegExp('chapter', 'gi'))) {
      refetchChapter().then(({ data: { getCourseChapters } }) => {
        updateChapterData(getCourseChapters);
      });

      if (errorChapterData) return alert('Chapter Refetch Error');
      return 'SUCCESS';
    }

    if (name.match(new RegExp('topic', 'gi'))) {
      refetchTopic().then(({ data: { getTopics } }) => {
        updateTopicData(getTopics);
      });

      if (errorChapterData) return alert('Topic Refetch Error');
      return 'SUCCESS';
    }
  }

  const refetchHooks = { refetchModule, refetchChapter, refetchTopic };
  const popUpValues = {
    isAddModulePopUpOpen,
    isEditModulePopUpOpen,
    isAddChapterPopUpOpen,
    isEditChapterPopUpOpen,
    isAddTopicPopUpOpen,
    isEditTopicPopUpOpen
  };
  return {
    popUpValues,
    togglePopUp,
    refetchHooks,
    refetchDataAndUpdateRecoil
  };
}
