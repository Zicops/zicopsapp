import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

export default function useHandleCourseTopic() {
  const router = useRouter();
  const courseId = router.query?.courseId;

  // recoil states
  const [moduleData, updateModuleData] = useRecoilState(ModuleAtom);
  const [chapterData, updateChapterData] = useRecoilState(ChapterAtom);
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // module, chapter, topic data query obj
  const [loadModuleData, { error: errorModuleData, refetch: refetchModule }] = useLazyQuery(
    GET_COURSE_MODULES,
    { client: queryClient }
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

    loadModuleData({ variables: { course_id: courseId }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        const sortedData = sortArrByKeyInOrder([...data.getCourseModules], 'sequence');
        updateModuleData(sortedData);

        if (errorModuleData) setToastMsg({ type: 'danger', message: 'Module Load Error' });
      }
    );

    loadChapterData({ variables: { course_id: courseId }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        updateChapterData(data.getCourseChapters);

        if (errorChapterData) setToastMsg({ type: 'danger', message: 'Chapter Load Error' });
      }
    );

    loadTopicData({ variables: { course_id: courseId }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        updateTopicData(data.getTopics);

        if (errorTopicData) setToastMsg({ type: 'danger', message: 'Topic Load Error' });
      }
    );
  }, [courseId]);

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

  return { refetchDataAndUpdateRecoil };
}
