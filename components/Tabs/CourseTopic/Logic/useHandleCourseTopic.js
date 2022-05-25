import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  queryClient
} from '../../../../API/Queries';
import { sortArrByKeyInOrder } from '../../../../helper/data.helper';
import { ChapterAtom, ModuleAtom, TopicAtom } from '../../../../state/atoms/module.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { CourseTabAtom, tabData } from '../../Logic/tabs.helper';

export default function useHandleCourseTopic() {
  const router = useRouter();
  const courseId = router.query?.courseId;
  // const
  const [tab, setTab] = useRecoilState(CourseTabAtom);

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
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

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
    if (!courseId) {
      updateModuleData([]);
      updateChapterData([]);
      updateTopicData([]);
      return;
    }
    
    loadModuleData({ variables: { course_id: courseId } }).then(({ data }) => {
      const sortedData = sortArrByKeyInOrder([...data.getCourseModules], 'sequence');
      updateModuleData(sortedData);

      if (errorModuleData) setToastMsg({ type: 'danger', message: 'Module Load Error' });
    });

    loadChapterData({ variables: { course_id: courseId } }).then(({ data }) => {
      updateChapterData(data.getCourseChapters);

      if (errorChapterData) setToastMsg({ type: 'danger', message: 'Chapter Load Error' });
    });

    loadTopicData({ variables: { course_id: courseId } }).then(({ data }) => {
      updateTopicData(data.getTopics);

      if (errorTopicData) setToastMsg({ type: 'danger', message: 'Topic Load Error' });
    });
  }, [courseId]);

  function togglePopUp(popUpName, value) {
    popUpStates.some((popUp) => {
      const isPopNameMatched = popUp.name.match(new RegExp(popUpName, 'gi'));
      if (isPopNameMatched) {
        if (!courseId) {
          setTab(tabData[0].name);
          setToastMsg({ type: 'danger', message: 'Add course first' });
          return;
        }

        popUp.update(typeof value === 'boolean' ? value : !popUp.state);
      }

      return isPopNameMatched;
    });
  }

  function refetchDataAndUpdateRecoil(name) {
    if (name.match(new RegExp('module', 'gi'))) {
      refetchModule().then(({ data: { getCourseModules } }) => {
        const sortedData = sortArrByKeyInOrder(getCourseModules);
        updateModuleData(sortedData);
      });

      if (errorModuleData) return setToastMsg({ type: 'danger', message: 'Module Refetch Error' });
      return 'SUCCESS';
    }

    if (name.match(new RegExp('chapter', 'gi'))) {
      refetchChapter().then(({ data: { getCourseChapters } }) => {
        const sortedData = sortArrByKeyInOrder(getCourseChapters);
        updateChapterData(sortedData);
      });

      if (errorChapterData)
        return setToastMsg({ type: 'danger', message: 'Chapter Refetch Error' });
      return 'SUCCESS';
    }

    if (name.match(new RegExp('topic', 'gi'))) {
      refetchTopic().then(({ data: { getTopics } }) => {
        const sortedData = sortArrByKeyInOrder(getTopics);
        updateTopicData(sortedData);
      });

      if (errorChapterData) return setToastMsg({ type: 'danger', message: 'Topic Refetch Error' });
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
